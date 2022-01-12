import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/CategoriesValidator';
import CategoriesController from '@controllers/CategoriesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

CategoriesController.getCategories = CategoriesController.getCategories.bind(CategoriesController);
CategoriesController.registerCategory =
  CategoriesController.registerCategory.bind(CategoriesController);

export default (router: Router) => {
  router.use('categories', [
    router.get('/list', CategoriesController.getCategories),
    router.post(
      '/register',
      registerValidate(),
      validateRequestSchema,
      CategoriesController.registerCategory,
    ),
  ]);
};
