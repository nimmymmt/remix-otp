const SmsConfigSchema = new mongoose.Schema({
    shop: { type: String, unique: true, required: true },
    service: { type: String, required: true },
    baseUrl: { type: String, required: true },
    dltId: { type: String, default: null },
    content: { type: String, default: null },
    username: { type: String, required: true }, // Twilio Account SID
    password: { type: String, required: true }, // Twilio Auth Token
    serviceId: { type: String, required: true }, // Twilio Verify Service SID
    isOtpRequired: { type: Boolean, default: false },
  });
  
  const SmsConfig = mongoose.model('SmsConfig', SmsConfigSchema);
  