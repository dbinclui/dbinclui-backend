import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/DigitalContentValidator';
import DigitalContentsController from '@controllers/DigitalContentsController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';
import upload from '@middlewares/upload/Multer';

const router = Router();

export default [
  router.get('/list', DigitalContentsController.getDigitalContents),
  router.post(
    '/register',
    registerValidate(),
    validateRequestSchema,
    upload.array('files'),
    DigitalContentsController.registerDigitalContent,
  ),
];
