import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(8080, () => {
  console.log(`Server running on port ${8080}`);
});
