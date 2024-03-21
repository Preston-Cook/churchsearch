import dotenv from 'dotenv-safe';
import sgClient from '@sendgrid/mail';

// Configure Environment
dotenv.config();

// Retrieve variables from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;

sgClient.setApiKey(SENDGRID_API_KEY);

export default sgClient;
