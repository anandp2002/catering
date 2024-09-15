import User from '../models/user.model.js';

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

    res.status(201).json({ user, message: 'User created successfully' });
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
