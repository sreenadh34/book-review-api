/**
 * Utility to wrap async route handlers and forward errors to Express error handler.
 * Ensures unhandled promise rejections are caught and passed to next().
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      err.statusCode = err.statusCode || 500;
      next(err);
    });
  };