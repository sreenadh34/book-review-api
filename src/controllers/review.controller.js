import { asyncHandler } from '../utils/asyncHandler.js';
import * as reviewService from '../services/review.service.js';

//Controller to create a new review for a book.
export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(
    req.user._id,
    req.params.id,
    req.body
  );
  res.status(201).json({ success: true, data: review });
});

// Controller to update an existing review by the user. 
export const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateUserReview(
    req.params.id,
    req.user._id,
    req.body
  );
  res.json({ success: true, data: review });
});

//Controller to delete a user's review.
export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteUserReview(req.params.id, req.user._id);
  res.json({ success: true, message: 'Review deleted' });
});