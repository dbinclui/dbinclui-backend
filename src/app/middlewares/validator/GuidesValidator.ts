import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const registerValidate = () => [
  body('title')
    .notEmpty()
    .withMessage('O campo está vazio')
    .isLength({ min: 1, max: 32 })
    .withMessage('Deve ter entre 1 e 32 caracteres')
    .isString(),
  body('content').notEmpty().withMessage('O campo está vazio').isString(),
];

export { registerValidate };
