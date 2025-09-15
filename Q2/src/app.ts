// src/app.ts
import express from 'express';
import accountsRouter from './routes/accounts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/accounts', accountsRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

export default app;
