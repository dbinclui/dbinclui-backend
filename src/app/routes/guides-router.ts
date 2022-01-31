import { Router } from 'express';
import { guidesValidate } from '@middlewares/validator/GuidesValidator';
import GuidesController from '@controllers/GuidesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/', GuidesController.getGuides),
  router.post('/', guidesValidate(), validateRequestSchema, GuidesController.registerGuide),
  router.get('/:id', GuidesController.consultGuide),
  router.get('/categoriesAndContent/:guideId', GuidesController.getWithCategoriesAndContent),
  router.put('/:id', guidesValidate(), validateRequestSchema, GuidesController.updateGuide),
];
