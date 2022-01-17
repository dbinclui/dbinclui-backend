import { Router } from 'express';
import GuidesController from '../controllers/GuidesController';
import { registerValidate, validateRequestSchema } from '../middlewares/validator/GuidesValidator';

GuidesController.getGuides = GuidesController.getGuides.bind(GuidesController);
GuidesController.registerGuide = GuidesController.registerGuide.bind(GuidesController);

export default (router: Router) => {
  router.use('guides', [
    router.get('/list', GuidesController.getGuides),
    router.post(
      '/register',
      registerValidate(),
      validateRequestSchema,
      GuidesController.registerGuide,
    ),
  ]);
};
