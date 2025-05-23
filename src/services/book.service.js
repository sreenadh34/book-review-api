import { Book } from '../models/Book.js';
import { Review } from '../models/Review.js';

export const createBook = async (body, user) =>
  Book.create({ ...body, created_by: user._id });

export const getBooks = async (filters = {}, page = 1, limit = 10) => {
  const query = {};
  // Add author filter if provided
  if (filters.author) query.author = filters.author;
  // Add genre filter if provided
  if (filters.genre) query.genre = filters.genre;

  // Fetch books and total count in parallel
  const [books, total] = await Promise.all([
    Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit),
    Book.countDocuments(query),
  ]);

  // Return paginated result with metadata
  return { total, page, pages: Math.ceil(total / limit), books };
};

/**
 * Service to get details of a single book by its ID.
 * Also calculates average rating and total reviews for the book.
 */
export const getBookDetails = async (bookId) => {
  // Find the book by ID
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Book not found');

  // Aggregate reviews to calculate average rating and total reviews
  const reviews = await Review.aggregate([
    { $match: { book: book._id } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  // Return book details along with rating info
  return {
    ...book.toObject(),
    averageRating: reviews[0]?.averageRating || 0,
    totalReviews: reviews[0]?.totalReviews || 0,
  };
};
