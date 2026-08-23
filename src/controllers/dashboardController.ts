import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as expedienteService from '../services/expedienteService';
import { getUsersList } from '../services/authService';

export async function obterEstatisticasDashboard(req: AuthRequest, res: Response) {
  try {
    const relatorio = await expedienteService.gerarRelatorioEstatisticos();
    const utilizadores = await getUsersList();

    const resumoUtilizadores = {
      total: utilizadores.length,
      activos: utilizadores.filter(u => u.ativo).length,
      porPerfil: {
        recepcionistas: utilizadores.filter(u => u.role === 'Recepcionista').length,
        chefesSector: utilizadores.filter(u => u.role === 'Chefe de Sector').length,
        directores: utilizadores.filter(u => u.role === 'Director').length,
        arquivistas: utilizadores.filter(u => u.role === 'Arquivista').length,
        administradores: utilizadores.filter(u => u.role === 'Administrador').length,
      }
    };

    return res.json({
      status: 'sucesso',
      timestamp: new Date().toISOString(),
      kpis: {
        totalExpedientes: relatorio.total,
        porEstado: relatorio.porEstado,
        porPrioridade: relatorio.porPrioridade,
        totalTramitacoes: relatorio.totalTramitacoes,
        urgentesPendentes: relatorio.urgentesPendentes,
        taxaResolucao: relatorio.taxaResolucao,
        mediaTramitacoesPorProcesso: relatorio.mediaTramitacoesPorProcesso
      },
      porSector: relatorio.porSector,
      ultimasTramitacoes: relatorio.ultimasTramitacoes,
      utilizadores: resumoUtilizadores
    });
  } catch (error: any) {
    return res.status(500).json({
      erro: error.message || 'Erro ao carregar estatísticas do dashboard'
    });
  }
}
