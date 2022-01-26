import { Router } from 'express';
import { guidesValidate } from '@middlewares/validator/GuidesValidator';
import GuidesController from '@controllers/GuidesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/list', GuidesController.getGuides),
  router.post('/register', guidesValidate(), validateRequestSchema, GuidesController.registerGuide),
  router.get('/consult/:id', GuidesController.consultGuide),
  router.get(
    '/getGuideWithCategoriesAndContent/:guideId',
    GuidesController.getWithCategoriesAndContent,
  ),
<<<<<<< HEAD
  router.delete('/:id', GuidesController.deleteGuide),
=======
  router.put('/:id', guidesValidate(), validateRequestSchema, GuidesController.updateGuide),
>>>>>>> dff3af275bd881d768756b1d989f9caef5ec9833
];
