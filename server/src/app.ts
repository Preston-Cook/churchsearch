import express from 'express';
import helmet from 'helmet';
import { accessLogger, errorLogger, consoleLogger } from './middleware/logger';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';
import corsOptions from './middleware/corsOptions';
import hpp from 'hpp';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimiterOptions from './middleware/rateLimiterOptions';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import churchRouter from './routes/churchRoutes';
import feedbackRouter from './routes/feedbackRoutes';
import contactRouter from './routes/contactRoutes';
import notFound from './middleware/notFound';

// Initialize Express app
const app = express();

// Obfuscate headers to enhance security
app.use(helmet());

// Initialize loggers
app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);

// Configure headers for Chrome CORS
app.use(credentials);

// Configure Cross Origin Resource Sharing
app.use(corsOptions);

// Prevents noSQL injection attacks
app.use(ExpressMongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

app.set('trust proxy', 1);

// Global rate limiter
app.use('*', rateLimiterOptions);

// Limit payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement Cookies
app.use(cookieParser());

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/churches', churchRouter);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/contact', contactRouter);

// 404 error handler
app.use('*', notFound);

// Global error handler
app.use(errorHandler);

export default app;
