import express from 'express';
import { configDotenv } from 'dotenv';
import authRoutes from '../backend/routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Allow us to parse the body of the request
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});
