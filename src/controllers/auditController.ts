import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as auditService from '../services/auditService';

export async function listarAuditoria(req: AuthRequest, res: Response) {
  try {
    const { acao, userRole, termo } = req.query;
    const logs = await auditService.listarAuditoria({
      acao: acao as string,
      userRole: userRole as string,
      termo: termo as string
    });

    return res.json({
      total: logs.length,
      logs
    });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message || 'Erro ao listar registos de auditoria' });
  }
}

export async function relatorioAuditoria(req: AuthRequest, res: Response) {
  try {
    const estatisticas = await auditService.obterEstatisticasAuditoria();
    return res.json({ estatisticas });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message || 'Erro ao gerar relatório de auditoria' });
  }
}
