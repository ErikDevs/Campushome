import bcrypt from "bcryptjs";
import { pool } from "../../database/db.js";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import {
  sendVerificationEmail,
  sendVerificationSMS,
} from "../services/verification.js";
import rateLimit from "express-rate-limit";

// Rate limiting for signup (5 attempts per 15 minutes)
export const signupRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many signup attempts from this IP, please try again later",
  skipSuccessfulRequests: true,
});

export const signUp = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { username, email, password, phone, university, location } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
      });
    }

    // Validate phone number if provided
    if (
      phone &&
      !validator.isMobilePhone(phone, "any", { strictMode: false })
    ) {
      return res.status(400).json({
        error: "Invalid phone number format",
      });
    }

    // Check if user already exists
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        error: "User with this email or username already exists",
      });
    }

    // Hash password
    const saltRounds = 12; // More secure than default 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification tokens
    const emailToken = uuidv4();
    const phoneToken = phone
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : null;

    // Create new user
    const [result] = await connection.query(
      `INSERT INTO users (
        username, 
        email, 
        password, 
        phone, 
        university, 
        location,
        emailverify,
        phoneverify,
        verified,
        role,
        email_verification_token,
        phone_verification_token,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, FALSE, FALSE, FALSE, 'user', ?, ?, NOW())`,
      [
        username,
        email,
        hashedPassword,
        phone || null,
        university || null,
        location || null,
        emailToken,
        phoneToken,
      ]
    );

    // Store verification tokens in separate table
    await connection.query(
      `INSERT INTO verification_tokens (
        user_id,
        email_token,
        phone_token,
        expires_at
      ) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
      [result.insertId, emailToken, phoneToken]
    );

    // Commit transaction
    await connection.commit();

    // Send verification emails/SMS (non-blocking)
    try {
      await sendVerificationEmail(email, emailToken);
      if (phone) {
        await sendVerificationSMS(phone, phoneToken);
      }
    } catch (emailError) {
      console.error("Error sending verification:", emailError);
      // Don't fail the request - just log the error
    }

    // Get the newly created user (without sensitive data)
    const [newUser] = await connection.query(
      `SELECT 
        id, 
        username, 
        email, 
        role, 
        created_at,
        emailverify,
        phoneverify,
        verified 
      FROM users WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: "User created successfully. Verification emails sent.",
      user: newUser[0],
      requiresVerification: true,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Signup error:", error);

    // Handle specific database errors
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "User with this email or username already exists",
      });
    }

    next(error);
  } finally {
    connection.release();
  }
};
