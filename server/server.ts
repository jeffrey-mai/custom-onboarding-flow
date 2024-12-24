import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import accountRouter from './routers/AccountRouter';
import db from './models/AccountModel';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'https://client-jeffrey-mais-projects.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await db.startDB();
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
})();

app.use('/', accountRouter);

app.use((req: Request, res: Response) =>
  res.status(404).send('Page Not Found')
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;