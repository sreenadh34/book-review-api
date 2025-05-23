import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { check } from 'express-validator';

const router = Router();

router.post('/signup', 
  validate([
    check('email')
      .isEmail().withMessage('Invalid email format'),

    check('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number')
      .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),

    check('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
      .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can contain only letters, numbers, and underscores')
  
  ]),
  signup
);

router.post('/login',
    validate([
      
    check('email')
    .isEmail().withMessage('Invalid email format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    ]),
    login
  );
  
  export default router;