import dotenv from 'dotenv-safe';
import dbConnect from './config/dbConnect';
import app from './app';

dotenv.config();

// Establish connection to database
dbConnect();

// Run server on specified port or default to 3000
const PORT = (process.env.PORT as string) || 3000;

const server = app.listen(PORT, () => {
  const isProduction = process.env.NODE_ENV === 'production';

  let url;
  if (isProduction) {
    url = process.env.PRODUCTION_SERVER_URL as string;
  } else {
    const port = process.env.PORT ?? '3000';
    url = `http://localhost:${port}`;
  }

  console.log(`Application running at ${url}`);
});

// Catch all exceptions
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

// handle global promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Shutdown server on SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down...');
  server.close(() => {
    console.log('Process terminated');
  });
});
