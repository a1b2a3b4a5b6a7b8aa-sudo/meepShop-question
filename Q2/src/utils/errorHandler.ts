// src/utils/errorHandler.ts
import { Response } from 'express';

export function handleError(res: Response, err: any) {
  const status = err.statusCode || 400;
  res.status(status).json({ error: err.message });
}