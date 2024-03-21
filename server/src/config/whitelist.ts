import dotenv from 'dotenv-safe';

dotenv.config();

const PRODUCTION_URL = process.env.PRODUCTION_URL;

const allowedOrigins =
  process.env.NODE_ENV === 'development'
    ? ['http://localhost:5173', undefined]
    : [PRODUCTION_URL];

export default allowedOrigins;
