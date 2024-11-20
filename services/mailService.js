import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send OTP email
export const sendOtpMailSmtp = async (email, otp) => {
   
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender's email
    to: email, // Recipient's email
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
