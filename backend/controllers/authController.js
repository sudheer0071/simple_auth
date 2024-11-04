const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({
        message: 'User already exists',
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.VITE_JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(201).json({ message: 'User signed up' });
  } catch (error) {
    res.status(500).json({
      message: 'Something Went wrong',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: 'User Not Found',
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: 'Invalid credentials',
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.VITE_JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.printIt = (req, res) => {
  return res.status(200).json({ message: 'Hello World' });
};
