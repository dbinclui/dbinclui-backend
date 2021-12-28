import { Router } from 'express';
import GuidesController from '../controllers/GuidesController';
import { guideValidate, validateRequestSchema } from '../middlewares/validator/GuidesValidator';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem vindo a API DBInclui' });
});

GuidesController.getGuides = GuidesController.getGuides.bind(GuidesController);
router.get('/accessibility-guide', GuidesController.getGuides);

GuidesController.registerGuide = GuidesController.registerGuide.bind(GuidesController);
router.post('/register-guide',guideValidate, validateRequestSchema, GuidesController.registerGuide);

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Ish, nada aqui O.o' });
});

export default router;
