import { Router } from 'express';
import { categoryValidate } from '@middlewares/validator/CategoriesValidator';
import CategoriesController from '@controllers/CategoriesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/list', CategoriesController.getCategories),
  router.post(
    '/register',
    categoryValidate(),
    validateRequestSchema,
    CategoriesController.registerCategory,
  ),
  router.get('/getByGuide/:id', CategoriesController.getCategoriesByGuide),
  router.put('/:id', categoryValidate(), validateRequestSchema, CategoriesController.updateCategory),
];
