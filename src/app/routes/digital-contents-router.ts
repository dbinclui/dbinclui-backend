import { Router } from 'express';
import { registerValidate, updateValidate } from '@middlewares/validator/DigitalContentValidator';
import DigitalContentsController from '@controllers/DigitalContentsController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';
import upload from '@middlewares/upload/Multer';
import digitalContentRepository from '@repositories/DigitalContentsRepository';

const router = Router();

export default [
  router.get('/:id', DigitalContentsController.consultDigitalContent),
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
  router.delete('/:id', DigitalContentsController.deleteDigitalContent),
];
