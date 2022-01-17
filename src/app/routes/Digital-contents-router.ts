import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/GuidesValidator';
import DigitalContentsController from '@controllers/DigitalContentsController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

DigitalContentsController.getDigitalContents = DigitalContentsController.getDigitalContents.bind(DigitalContentsController);
DigitalContentsController.registerDigitalContents = DigitalContentsController.registerDigitalContents.bind(DigitalContentsController);

export default [
  router.get('/list', DigitalContentsController.getDigitalContents),
  router.post(
    '/register',
    registerValidate(),
    validateRequestSchema,
    DigitalContentsController.registerDigitalContents,
  ),
];
