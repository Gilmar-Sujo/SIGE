import { Router } from 'express';
import { autenticar, autorizarPapel } from '../middlewares/authMiddleware';
import * as expedienteController from '../controllers/expedienteController';

const router = Router();

// Todas as rotas requerem autenticação
router.use(autenticar);

// Listar e Relatórios
router.get('/', expedienteController.listarExpedientes);
router.get('/relatorio', autorizarPapel(['Director', 'Chefe de Sector', 'Administrador']), expedienteController.relatorioEstatistico);
router.get('/:id', expedienteController.obterExpedientePorId);

// Registar novo expediente (Recepção ou Admin)
router.post('/', autorizarPapel(['Recepcionista', 'Administrador']), expedienteController.criarExpediente);

// Tramitação (Recepção, Chefe de Sector, Director, Admin)
router.post('/:id/tramitar', autorizarPapel(['Recepcionista', 'Chefe de Sector', 'Director', 'Administrador']), expedienteController.tramitarExpediente);

// Despacho oficial (Chefe de Sector, Director, Admin)
router.post('/:id/despachar', autorizarPapel(['Chefe de Sector', 'Director', 'Administrador']), expedienteController.emitirDespacho);

// Arquivamento (Arquivista, Director, Admin)
router.post('/:id/arquivar', autorizarPapel(['Arquivista', 'Director', 'Administrador']), expedienteController.arquivarExpediente);

export default router;
