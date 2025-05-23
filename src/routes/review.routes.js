import { Router } from 'express';
import { 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/review.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { check } from 'express-validator';

const router = Router();

// Route to create a new review for a book
// Requires authentication and validates rating (1-5) and optional comment
router.post('/books/:id/reviews',
  authenticate,
  validate([
    check('rating').isInt({ min: 1, max: 5 }),
    check('comment').optional().isString()
  ]),
  createReview
);

// Route to update an existing review by review ID
// Requires authentication and validates optional rating and comment
router.put('/reviews/:id',
    authenticate,
    validate([
      check('rating').optional().isInt({ min: 1, max: 5 }),
      check('comment').optional().isString()
    ]),
    updateReview
  );
  
  router.delete('/reviews/:id', authenticate, deleteReview);
  
  export default router;