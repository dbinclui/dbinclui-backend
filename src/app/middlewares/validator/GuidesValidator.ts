import { body } from 'express-validator';
import CategoriesRepository from '@repositories/CategoriesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';

const guidesValidate = () => [
  body('title')
    .notEmpty()
    .withMessage('O campo está vazio')
    .isLength({ min: 1, max: 32 })
    .withMessage('Deve ter entre 1 e 32 caracteres')
    .isString(),
  body('content').notEmpty().withMessage('O campo está vazio').isString(),
];

async function validateGuideforDelete(guideId: string) {
  const categoryRepository = new CategoriesRepository();
  const digitalContentRepository = new DigitalContentRepository();

  try {
    const resultCategory = await categoryRepository.getByGuideId(guideId);
    const resultDigitalContent = await digitalContentRepository.getByGuide(guideId);
    return resultCategory.length === 0 && resultDigitalContent.length === 0;
  } catch (error) {
    return { message: error };
  }
}

export { guidesValidate, validateGuideforDelete };
