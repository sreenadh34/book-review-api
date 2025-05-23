import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const createUser = async (userData) => {
  // Check for existing user by email or username
  if (
    await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    })
  ) {
    throw new Error('User already exists');
  }
  // Create and return the new user
  return User.create(userData);
};

export const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  // Check if user exists and password is correct
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  // Generate JWT token with userId payload and expiration
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
  return token;
};
