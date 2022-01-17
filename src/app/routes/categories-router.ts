import { Router } from 'express';
import { registerValidate } from '@middlewares/validator/CategoriesValidator';
import CategoriesController from '@controllers/CategoriesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/list', CategoriesController.getCategories),
  router.post(
    '/register',
    registerValidate(),
    validateRequestSchema,
    CategoriesController.registerCategory,
  ),
  router.get('/getByGuide/:id', CategoriesController.getCategoriesByGuide),
];
