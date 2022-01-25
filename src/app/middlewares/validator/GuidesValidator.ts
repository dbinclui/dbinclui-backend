import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import CategoriesRepository from '@repositories/CategoriesRepository';

const registerValidate = () => [
  body('title')
    .notEmpty()
    .withMessage('O campo está vazio')
    .isLength({ min: 1, max: 32 })
    .withMessage('Deve ter entre 1 e 32 caracteres')
    .isString(),
  body('content').notEmpty().withMessage('O campo está vazio').isString(),
];

async function validateGuideforDelete(guideId: string): Promise<any> {
  const repository = new CategoriesRepository();
  try {
    const result = await repository.getByGuideId(guideId);
    return result;
  } catch (error) {
    return { message: error };
  }
}
validateGuideforDelete('61f052746ec73927246fce');

// console.log(validateGuideforDelete('61f052746ec73927246fce65'));

export { registerValidate };
