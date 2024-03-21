import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Ensure log folder exists
const DIRECTORY_PATH = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(DIRECTORY_PATH)) {
  fs.mkdirSync(DIRECTORY_PATH);
}

// Create paths for log files
const ACCESS_LOG = path.join(__dirname, '..', 'logs', 'access.log');
const ERROR_LOG = path.join(__dirname, '..', 'logs', 'error.log');

if (fs.existsSync(ACCESS_LOG)) {
  fs.unlinkSync(ACCESS_LOG);
}

if (fs.existsSync(ERROR_LOG)) {
  fs.unlinkSync(ERROR_LOG);
}

// Export logger objects
export const accessLogger = morgan('combined', {
  skip: function (_req, res) {
    return res.statusCode >= 400;
  },
  stream: fs.createWriteStream(ACCESS_LOG, { flags: 'a' }),
});

export const errorLogger = morgan('combined', {
  skip: function (_req, res) {
    return res.statusCode < 400;
  },
  stream: fs.createWriteStream(ERROR_LOG, { flags: 'a' }),
});

export const consoleLogger =
  process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('combined');
