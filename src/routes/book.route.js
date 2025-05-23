import { Router } from 'express';
import { 
  createBook, 
  getBooks, 
  getBookById 
} from '../controllers/book.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { check } from 'express-validator';
import { searchBooks } from '../controllers/search.controller.js';

const router = Router();

router.post('/', 
  authenticate,
  validate([
    check('title').notEmpty(),
    check('author').notEmpty(),
    check('genre').notEmpty()
  ]),
  createBook
);

router.get('/', 
    validate([
      check('page').optional().isInt({ min: 1 }),
      check('limit').optional().isInt({ min: 1 })
    ]),
    getBooks
  );
  router.get('/search', 
    searchBooks
  );
  router.get('/:id', getBookById);
  
  export default router; 