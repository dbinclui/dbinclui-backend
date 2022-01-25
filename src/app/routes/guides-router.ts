import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/GuidesValidator';
import GuidesController from '@controllers/GuidesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/list', GuidesController.getGuides),
  router.post(
    '/register',
    registerValidate(),
    validateRequestSchema,
    GuidesController.registerGuide,
  ),
  router.get(
    '/getGuideWithCategoriesAndContent/:guideId',
    GuidesController.getWithCategoriesAndContent,
  ),
  router.put('/update/:id', GuidesController.updateGuide),
];
