import path, { extname } from 'path';
import crypto from 'crypto';
import { diskStorage } from 'multer';

const filesTmpDirectory = path.resolve(__dirname, '..', '..', 'tmp');
const filesUploadsDirectory = path.resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'uploads',
);

export default {
  tmpFolder: filesTmpDirectory,
  uploadsFolder: filesUploadsDirectory,

  storage: diskStorage({
    destination: filesTmpDirectory,
    filename(req, file, callback) {
      const randomHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${randomHash}${extname(file.originalname)}`;

      return callback(null, filename);
    },
  }),
};
