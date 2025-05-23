import { asyncHandler } from '../utils/asyncHandler.js';
import * as bookService from '../services/book.service.js';


// controller for creating a book
export const createBook = asyncHandler(async (req, res) => {
  const  {body ,user} = req;
  const book = await bookService.createBook(body, user);
  res.status(201).json({ success: true, data: book });
});

// controller for updating a book
export const getBooks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;

    // Fetch books with optional filters and pagination
  const result = await bookService.getBooks({ author, genre }, page, limit);
  res.json({ success: true, ...result });
});

export const getBookById = asyncHandler(async (req, res) => {

    // Fetch book details by ID from the route parameter
  const book = await bookService.getBookDetails(req.params.id);
  res.json({ success: true, data: book });
});