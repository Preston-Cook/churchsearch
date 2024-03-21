import type { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  next(new AppError(`${req.originalUrl} does not exist in API`, 404));
}
