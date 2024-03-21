import twilio from 'twilio';
import dotenv from 'dotenv-safe';

// Configure environment variables
dotenv.config();

// Retrieve environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;

// Export twilio client
export default twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
