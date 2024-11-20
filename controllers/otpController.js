import { sendOtpMailSmtp } from '../services/mailService.js';
import{ sendOtpSmsTwilio } from '../services/smsService.js';


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log('Email:', email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();
  console.log('Generated OTP:', otp);

  try {
    await sendOtpMailSmtp(email, otp);
    return res.status(200).json({ message: 'OTP sent successfully', otp }); // Include OTP for testing (remove in production)
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};
export const sendOtpTwilio = async (req, res) => {
  const { phone } = req.body;
  console.log('Phone:', phone);
  const otp = generateOTP();
  try {
    const messageId = await sendOtpSmsTwilio(phone, otp);  // Call Twilio SMS service
    res.status(200).json({ message: 'OTP sent successfully!', messageId });
  } catch (error) {
    res.status(500).json({ error: 'Error sending OTP' });
  }
}

