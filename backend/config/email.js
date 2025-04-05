import nodemailer from "nodemailer";
import "dotenv/config";

// Validate required environment variables
const requiredEnvVars = [
  "EMAIL_SERVICE",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_FROM",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST || undefined, // Only needed for custom SMTP
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : undefined,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: process.env.NODE_ENV === "production",
  },
  // Connection pool options
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000, // 1 second
  rateLimit: 5, // Max 5 emails per second
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error("Error with email configuration:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Email template function
const createEmailTemplate = (type, data) => {
  const templates = {
    verification: {
      subject: "Verify Your Email Address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to ${process.env.APP_NAME || "Our Service"}!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${data.verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; 
                    color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p>${data.verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    },
    passwordReset: {
      subject: "Password Reset Request",
      html: `...`, // Similar template structure
    },
  };

  return templates[type] || null;
};

// Send email function with retry logic
export const sendEmail = async (to, type, data) => {
  const template = createEmailTemplate(type, data);
  if (!template) {
    throw new Error("Invalid email template type");
  }

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || process.env.APP_NAME}" <${
      process.env.EMAIL_FROM
    }>`,
    to,
    subject: template.subject,
    html: template.html,
    // Text fallback for non-HTML clients
    text: template.text || template.html.replace(/<[^>]*>/g, ""),
  };

  // Retry logic (3 attempts)
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} (attempt ${attempts})`);
      return info;
    } catch (error) {
      if (attempts >= maxAttempts) {
        console.error(
          `Failed to send email after ${maxAttempts} attempts`,
          error
        );
        throw error;
      }
      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempts))
      );
    }
  }
};

export default transporter;
