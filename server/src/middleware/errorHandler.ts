import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const err = { ...error, name: error.name, message: error.message };

  if (err.message === 'Origin Blocked') {
    err.statusCode = 401;
  }

  if (err.name === 'MulterError') {
    err.statusCode = 400;
  }
  if (err.name === 'CastError') {
    err.statusCode = 400;
    const { path, value } = err;
    err.message = `Invalid ${path as string}: ${value as string}.`;
  }

  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid JWT';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'JWT Expired';
  }

  if (err.name === 'ValidationError') {
    err.statusCode = 400;
  }

  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'fail';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
