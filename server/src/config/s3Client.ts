import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv-safe';

// Configure environment
dotenv.config();

// Retrieve environment variables
const AWS_REGION = process.env.AWS_S3_REGION as string;
const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY as string;

// Export s3 Client
const s3Client = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

export default s3Client;
