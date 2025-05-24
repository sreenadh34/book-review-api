import { Book } from '../models/Book.js';

export const searchBooksService = async (query) => {
  return await Book.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
    ],
  }).limit(10);
};
