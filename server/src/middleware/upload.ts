import type { Request } from 'express';
import dotenv from 'dotenv-safe';
import multer from 'multer';
import AppError from '../utils/appError';
import { ACCEPTED_EXTENSIONS } from '../config/constants';
import multerS3 from 'multer-s3';
import s3Client from '../config/s3Client';
import crypto from 'crypto';

dotenv.config();

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET as string;
const AWS_REGION = process.env.AWS_S3_REGION as string;

function createImageName(): string {
  return crypto.randomBytes(32).toString('hex');
}

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: AWS_S3_BUCKET,
    key: function (req: Request, file, cb) {
      if (!req.churchImages) {
        req.churchImages = [];
      }
      const bytes = createImageName();
      const uri = `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${bytes}`;

      if (file.fieldname === 'pastorImage') {
        req.pastorImage = uri;
      }

      if (file.fieldname === 'churchImages') {
        req.churchImages.push(uri);
      }

      cb(null, bytes);
    },
    contentType(_req, file, callback) {
      callback(null, file.mimetype);
    },
  }),
  fileFilter(_req, file, callback) {
    if (!ACCEPTED_EXTENSIONS.includes(file.mimetype)) {
      callback(
        new AppError(
          'Images Must Have .png, .jpg, or .jpeg File Extension',
          400
        )
      );
      return;
    }
    callback(null, true);
  },
});

export default upload;
