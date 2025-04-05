import nodemailer from "nodemailer";
import twilio from "twilio";

const transporter = nodemailer.createTransport({
  // your email config
});

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: "Verify Your Email",
    html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
  });
};

export const sendVerificationSMS = async (phone, code) => {
  await twilioClient.messages.create({
    body: `Your verification code is: ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};
