import { body, check } from 'express-validator';

const registerValidate = () => [
  body('title').notEmpty().withMessage('O campo está vazio').isString(),

  body('shortDescription').notEmpty().withMessage('O campo está vazio').isString(),
  body('guide').notEmpty().withMessage('O campo está vazio').isString(),
  body('filePath').notEmpty().withMessage('O campo está vazio').isString(),
  check('files')
    .custom((value, { req }) => req.files.lenght > 0)
    .withMessage('Envie ao menos um arquivo.')
    .custom((value, { req }) => {
      let isValid = false;
      req.files.forEach((file: any) => {
        if (file.mimetype.includes('video') || file.mimetype.includes('image')) {
          isValid = true;
        }
      });
    }),
];

export { registerValidate };
