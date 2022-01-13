import { Router } from 'express';
import upload from '@middlewares/upload/Multer';
import guidesRouter from './guides-router';
import categoriesRouter from './categories-router';

const router = Router();

router.use('/guides', guidesRouter);
router.use('/categories', categoriesRouter);

router.get('/',upload.single('file') ,(_, res) => {
  // eslint-disable-next-line no-console
  console.log(_.file, _.body);
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

router.get('*', (_, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

export default router;
