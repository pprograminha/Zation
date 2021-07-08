import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const hashed = crypto.randomBytes(8).toString('hex');
        const fileName = `${hashed}-${file.originalname}`;

        callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
