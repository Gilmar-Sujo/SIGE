import { Router } from 'express';
import { autenticar, autorizarPapel } from '../middlewares/authMiddleware';
import * as auditController from '../controllers/auditController';

const router = Router();

router.use(autenticar);

// Auditoria restrita a Administrador, Director e Chefe de Sector
router.get('/', autorizarPapel(['Administrador', 'Director', 'Chefe de Sector']), auditController.listarAuditoria);
router.get('/relatorio', autorizarPapel(['Administrador', 'Director']), auditController.relatorioAuditoria);

export default router;
