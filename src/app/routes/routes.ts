import { Router } from 'express';
import guidesRouter from './guides-router';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

guidesRouter(router);

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

export default router;
