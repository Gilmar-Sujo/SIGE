import { Router } from 'express';
import { obterEstatisticasDashboard } from '../controllers/dashboardController';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.get('/stats', autenticar, obterEstatisticasDashboard);

export default router;
