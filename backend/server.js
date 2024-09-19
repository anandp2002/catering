import express from 'express';
import { configDotenv } from 'dotenv';
import authRoutes from '../backend/routes/auth.route.js';
import productRoutes from '../backend/routes/product.route.js';
import cartRoutes from '../backend/routes/cart.route.js';
import couponRoutes from '../backend/routes/coupon.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //Allow us to parse the body of the request
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});
