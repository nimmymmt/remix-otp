
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import otpRoutes from './routes/otpRoutes.js';



const app = express();
app.use(express.json());

// Routes
app.use('/api', otpRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
