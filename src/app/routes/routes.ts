import { Router } from 'express';
import GuidesController from '../controllers/GuidesController';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

GuidesController.getGuides = GuidesController.getGuides.bind(GuidesController);
router.get('/accessibility-guide', GuidesController.getGuides);

GuidesController.postGuides = GuidesController.postGuides.bind(GuidesController);
router.post('/accessibility-guide', GuidesController.postGuides);

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

export default router;
