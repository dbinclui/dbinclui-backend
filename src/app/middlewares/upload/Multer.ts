import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import  multer from 'multer';
import { Request } from 'express'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Uploads",
    format: async (req: Request, file: any)=>  'mp4'
  } as any,
});

const upload = multer({ storage });

export default upload;