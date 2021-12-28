import {  NextFunction, Request, Response } from 'express';
import { body,validationResult } from 'express-validator';

// eslint-disable-next-line consistent-return
function validateRequestSchema(
 req: Request,
 res: Response,
 next: NextFunction
) {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
 next();
}

const guideValidate = [
  body('title')
    .notEmpty()
    .withMessage('O campo está vazio')
    .isLength({ min: 1, max: 32 })
    .withMessage('Deve ter entre 1 e 32 caracteres')
    .isString(),

  body('content')
  .notEmpty()
  .withMessage('O campo está vazio')
  .isString(),
];

export { guideValidate,validateRequestSchema};
