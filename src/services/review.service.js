import { Review } from '../models/Review.js';

export const createReview = async (userId, bookId, reviewData) => {
  // Check if the user has already reviewed this book
  const existingReview = await Review.findOne({ user: userId, book: bookId });
  if (existingReview) throw new Error('Already reviewed this book');
  
  // Create and return the new review
  return Review.create({ ...reviewData, user: userId, book: bookId });
};

export const updateUserReview = async (reviewId, userId, updateData) => {
  // Find and update the review if it belongs to the user
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    updateData,
    { new: true }
  );
  if (!review) throw new Error('Review not found');
  return review;
};

export const deleteUserReview = async (reviewId, userId) => {
  // Find and delete the review if it belongs to the user
  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) throw new Error('Review not found');
  return review;
};
