import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API is running' });
});

export default app;