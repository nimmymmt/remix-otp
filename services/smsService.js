import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';

// Configure Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
export const sendOtpSmsTwilio = async (phoneNumber) => {
        console.log(otp)
        try {
            const verification = await client.verify.v2.services(verifyServiceSid)
              .verifications.create({
                to: phoneNumber,
                channel: 'sms',
              });
        
            console.log('OTP sent:', verification.status); // Should print 'pending'
            return verification.status;
          } catch (error) {
            console.error('Error sending OTP:', error);
            throw new Error('Failed to send OTP');
          }
  };