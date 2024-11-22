import express from 'express';
import { sendOtp, sendOtp_Twilio,verifyOtp_Twilio } from '../controllers/otpController.js';


const router = express.Router();

router.post('/send-otp-emailSmtp', sendOtp);

router.post("/sendOtpTwilio", sendOtp_Twilio);
router.post("/verifyOtpTwilio", verifyOtp_Twilio);

export default router;
