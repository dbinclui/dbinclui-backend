import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Uploads',
    resource_type: 'auto',
  } as any,
});

const upload = multer({
  fileFilter: (req, file, callback) => {
    const validTypes = /video|image/;

    if (validTypes.test(file.mimetype)) {
      return callback(null, true);
    }
    callback(null, false);
    return callback(new Error('Arquivo não suportado. Envie apenas vídeo ou imagem.'));
  },

  storage,
  limits: {
    fileSize: 5000000,
  },
});

export default upload;
