import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

// controller for user signup
// create user 

export const signup = asyncHandler(async (req, res) => {
  const user = await authService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

// controller for user login
// response with jwt token

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginUser(email, password);
  res.json({ success: true, token });
});