import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// Middleware to authenticate requests using JWT.
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and starts with 'Bearer '
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
