import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/DigitalContentValidator';
import DigitalContentsController from '@controllers/DigitalContentsController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';
import upload from '@middlewares/upload/Multer';
import digitalContentRepository from '@repositories/DigitalContentsRepository';

const router = Router();

export default [
  router.get('/list', DigitalContentsController.getDigitalContents),
  router.get('/:id', DigitalContentsController.consultDigitalContent),
  router.post(
    '/register',
    upload.array('files'),
    registerValidate(),
    validateRequestSchema,
    DigitalContentsController.registerDigitalContent,
  ),
];
