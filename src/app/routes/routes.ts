import { Router } from 'express';
import GuidesController from '../controllers/GuidesController';

const router = Router();

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

router.get('/accessibility-guide', GuidesController.getGuides);

export default router;
