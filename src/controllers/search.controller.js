import { StatusCodes } from 'http-status-codes';
import { searchBooksService } from '../services/search.service';

/**
 * Controller to search for books by title or author.
 * Expects a 'q' query parameter for the search term.
 * Responds with up to 10 matching books or an appropriate message if none found.
 */
export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Search query is required',
      });
    }

    // Search for books where title or author matches the query (case-insensitive)
    const books = await searchBooksService(q);

    if (books.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No books found matching your query',
      });
    }
    {
      res.json(books);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Search failed',
    });
  }
};
