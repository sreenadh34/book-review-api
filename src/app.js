import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv"; 

import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.route.js';
import reviewRoutes from './routes/review.routes.js';
import { errorHandler } from './middlewares/error.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1', reviewRoutes);

// Error handling
app.use(errorHandler);


const PORT =process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});