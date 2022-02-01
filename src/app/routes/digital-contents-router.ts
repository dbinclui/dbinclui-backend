import { Router } from 'express';
import { registerValidate, updateValidate } from '@middlewares/validator/DigitalContentValidator';
import DigitalContentsController from '@controllers/DigitalContentsController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';
import upload from '@middlewares/upload/Multer';

const router = Router();

export default [
  router.get('/', DigitalContentsController.getDigitalContents),
  router.post(
    '/',
    upload.array('files'),
    registerValidate(),
    validateRequestSchema,
    DigitalContentsController.registerDigitalContent,
  ),
  router.put(
    '/:id',
    upload.array('files'),
    updateValidate(),
    validateRequestSchema,
    DigitalContentsController.updateDigitalContent,
  ),
];
