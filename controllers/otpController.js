import { sendOtpMailSmtp } from '../services/mailService.js';

import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';

// Configure Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

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

export const sendOtp_Twilio=async(req,res)=>{
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications.create({
        to: `+91${phone}`,
        channel: 'sms',
      });

    console.log('OTP sent:', verification.status); // Should print 'pending'
    res.status(200).json({
      message: 'OTP sent successfully',
      status: verification.status, // Typically 'pending'
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

export const verifyOtp_Twilio = async (req, res) => {  
  const { phone, code } = req.body;  
  console.log('Phone:', phone);      
  try {
    const verification = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks.create({  to: `+91${phone}`, code: code });
    if (verification.status === 'approved') {
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      res.status(400).json({ error: 'OTP verification failed' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
    
  }
