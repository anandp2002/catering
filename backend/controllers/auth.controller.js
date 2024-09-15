import { redis } from '../lib/redis.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (refreshToken, userId) => {
  await redis.set(
    `refresh_token : ${userId}`,
    refreshToken,
    'EX',
    7 * 24 * 60 * 60 //7 days
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie('access-token', accessToken, {
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', //prevents CSRF attacks(cross site request forgery)
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refresh-token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be atleast 6 characters',
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists !' });
    }

    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: 'User created successfully',
    });
  } catch (error) {
    console.log('Error in signup controller : ' + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
export const login = async (req, res) => {
  res.send('login');
};
export const logout = async (req, res) => {
  res.send('logout');
};
