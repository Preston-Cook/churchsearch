import type { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export default function (
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(new AppError('Method Not Allowed', 405));
}
