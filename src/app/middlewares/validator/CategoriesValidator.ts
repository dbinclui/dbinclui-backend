import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import { body } from 'express-validator';

const categoryValidate = () => [
  body('title').notEmpty().withMessage('O campo está vazio').isString(),

  body('shortDescription').notEmpty().withMessage('O campo está vazio').isString(),
  body('guide').notEmpty().withMessage('O campo está vazio').isString(),
];

async function validateCategoriesforDelete(categoriesId: string) {
  const digitalContentRepository = new DigitalContentRepository();
  try {
    const resultDigitalContent = await digitalContentRepository.getByCategory(categoriesId);
    return resultDigitalContent.length === 0;
  } catch (error) {
    return { message: error };
  }
}

export { categoryValidate, validateCategoriesforDelete };
