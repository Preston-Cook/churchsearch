import { rateLimit } from 'express-rate-limit';

export default rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Rate limit exceeded for IP',
});
