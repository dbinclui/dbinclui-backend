import { Router } from 'express';
import guidesRouter from '@routes/guides-router';
import categoriesRouter from '@routes/categories-router';

const router = Router();

router.use('/guides', guidesRouter);
router.use('/categories', categoriesRouter);

router.get('/', (_, res) => {
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

router.get('*', (_, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

export default router;
