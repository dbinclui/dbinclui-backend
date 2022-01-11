import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

function validateRequestSchema(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(405).json({ errors: errors.array() });
  }
  return next();
}

const registerValidate = () => [
  body('title').notEmpty().withMessage('O campo está vazio').isString(),

  body('shortDescription').notEmpty().withMessage('O campo está vazio').isString(),
  body('guide').notEmpty().withMessage('O campo está vazio').isString(),
];

export { registerValidate, validateRequestSchema };
