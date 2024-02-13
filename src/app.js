import express from 'express';
import cors from 'cors';
import config from './config/dotenv.js';
import notesRouter from './routes/notes.router.js';
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
    credentials: true, // Habilita el intercambio de cookies
  })
);
app.use(cookieParser());

app.use('/api/notes', notesRouter);
app.use('/api/auth', authRouter);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
