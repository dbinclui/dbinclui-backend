import { body } from 'express-validator';

const categoryValidate = () => [
  body('title').notEmpty().withMessage('O campo está vazio').isString(),

  body('shortDescription').notEmpty().withMessage('O campo está vazio').isString(),
  body('guide').notEmpty().withMessage('O campo está vazio').isString(),
];

export { categoryValidate };
