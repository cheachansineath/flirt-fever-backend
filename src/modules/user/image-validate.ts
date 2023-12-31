import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = [
    'image/png',
    'image/jpg',
    'image/jpeg'
];

export const saveImageToStorage = {
    storage: diskStorage({
        destination: process.env.FILE_PATH,
        filename: (req, file, cb) => {
            const fileExtension: string = path.extname(file.originalname);
            const fileName: string = uuidv4() + fileExtension;
            cb(null, fileName)
        }
    }),
    filter: (req, file, cb) => {
        const allowedMimeTypes: validMimeType[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimeType) ? cb(null, true) : cb(null, false)
    }
}