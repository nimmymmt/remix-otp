import express from 'express';
import { sendOtp } from '../controllers/otpController.js';
import { sendOtpTwilio } from '../controllers/otpController.js';

const router = express.Router();

router.post('/send-otp-emailSmtp', sendOtp);
router.post('/send-otp-smsTwilio', sendOtpTwilio);

export default router;
