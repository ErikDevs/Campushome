import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../../database/db.js";
import "dotenv/config";

// Token generation functions
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Login controller
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const connection = await pool.getConnection();
  try {
    // 1. Find user by email
    const [users] = await connection.query(
      `SELECT 
        id, 
        email, 
        password, 
        role, 
        emailverify,
        verified
      FROM users 
      WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const user = users[0];

    // 2. Verify email is confirmed
    if (!user.emailverify) {
      return res.status(403).json({
        error: "Email not verified. Please check your inbox.",
      });
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // 4. Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // 5. Store refresh token in database
    await connection.query(
      `INSERT INTO refresh_tokens 
      (user_id, token, expires_at) 
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [user.id, refreshToken]
    );

    // 6. Set cookies (secure in production)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 7. Send response
    res.json({
      userId: user.id,
      role: user.role,
      accessToken,
      expiresIn: 15 * 60, // 15 minutes in seconds
    });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
};

// Token refresh controller
export const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const connection = await pool.getConnection();
  try {
    // 1. Verify token exists in database
    const [tokens] = await connection.query(
      `SELECT 
        t.token, 
        u.id as user_id,
        u.role
      FROM refresh_tokens t
      JOIN users u ON t.user_id = u.id
      WHERE t.token = ? 
      AND t.expires_at > NOW()`,
      [refreshToken]
    );

    if (tokens.length === 0) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // 2. Verify JWT
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.userId !== tokens[0].user_id) {
          return res.status(403).json({ error: "Forbidden" });
        }

        // 3. Generate new access token
        const newAccessToken = generateAccessToken(decoded.userId);

        res.json({
          accessToken: newAccessToken,
          expiresIn: 15 * 60, // 15 minutes in seconds
          role: tokens[0].role,
        });
      }
    );
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
};
