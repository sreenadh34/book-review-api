import { validationResult } from 'express-validator';

/**
 * Middleware to run express-validator validations and handle errors.
 * @param {Array} validations - Array of validation chains.
 * @returns {Array} Array containing the validations and error handler middleware.
 */
export const validate = (validations) => [
  validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
