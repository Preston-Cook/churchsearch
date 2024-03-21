import whitelist from '../config/whitelist';
import type { Request, Response, NextFunction } from 'express';

export default function credentials(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const origin = req.headers.origin;

  if (whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
}
