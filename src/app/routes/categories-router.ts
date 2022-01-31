import { Router } from 'express';
import { categoryValidate } from '@middlewares/validator/CategoriesValidator';
import CategoriesController from '@controllers/CategoriesController';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

const router = Router();

export default [
  router.get('/', CategoriesController.getCategories),
  router.post(
    '/',
    categoryValidate(),
    validateRequestSchema,
    CategoriesController.registerCategory,
  ),
  router.get('/guide/:id', CategoriesController.getCategoriesByGuide),
  router.get('/:id', CategoriesController.consultCategories),
  router.put(
    '/:id',
    categoryValidate(),
    validateRequestSchema,
    CategoriesController.updateCategory,
  ),
];
