import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/GuidesValidator';
import GuidesController from '@controllers/GuidesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

GuidesController.getGuides = GuidesController.getGuides.bind(GuidesController);
GuidesController.registerGuide = GuidesController.registerGuide.bind(GuidesController);

export default [
  router.get('/list', GuidesController.getGuides),
  router.post(
    '/register',
    registerValidate(),
    validateRequestSchema,
    GuidesController.registerGuide,
  ),
];
