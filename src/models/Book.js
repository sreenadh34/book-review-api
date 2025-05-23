import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
