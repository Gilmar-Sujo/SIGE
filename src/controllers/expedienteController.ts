import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as expedienteService from '../services/expedienteService';

export async function criarExpediente(req: AuthRequest, res: Response) {
  try {
    const { titulo, assunto, remetente, prioridade, sectorDestino, anexos } = req.body;
    if (!titulo || !assunto || !remetente) {
      return res.status(400).json({ erro: 'Os campos titulo, assunto e remetente são obrigatórios.' });
    }

    const expediente = await expedienteService.criarExpediente(
      { titulo, assunto, remetente, prioridade, sectorDestino, anexos },
      req.usuario!
    );

    return res.status(201).json({
      mensagem: 'Expediente registado com sucesso',
      expediente
    });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message || 'Erro ao registar expediente' });
  }
}

export async function listarExpedientes(req: AuthRequest, res: Response) {
  try {
    const { estado, sector, prioridade, termo } = req.query;
    const expedientes = await expedienteService.listarExpedientes({
      estado: estado as string,
      sector: sector as string,
      prioridade: prioridade as string,
      termo: termo as string
    });

    return res.json({
      total: expedientes.length,
      expedientes
    });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message || 'Erro ao listar expedientes' });
  }
}

export async function obterExpedientePorId(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const expediente = await expedienteService.obterExpedientePorId(id);
    return res.json({ expediente });
  } catch (error: any) {
    return res.status(404).json({ erro: error.message || 'Expediente não encontrado' });
  }
}

export async function tramitarExpediente(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const { destinoSector, despachoOuParecer } = req.body;

    if (!destinoSector || !despachoOuParecer) {
      return res.status(400).json({ erro: 'Campos destinoSector e despachoOuParecer são obrigatórios.' });
    }

    const expediente = await expedienteService.tramitarExpediente(
      id,
      destinoSector,
      despachoOuParecer,
      req.usuario!
    );

    return res.json({
      mensagem: 'Expediente tramitado com sucesso',
      expediente
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message || 'Erro ao tramitar expediente' });
  }
}

export async function emitirDespacho(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const { despachoTexto, decisao } = req.body;

    if (!despachoTexto || !decisao) {
      return res.status(400).json({ erro: 'Campos despachoTexto e decisao (APROVADO/REJEITADO/SOLICITAR_INFORMACAO) são obrigatórios.' });
    }

    const expediente = await expedienteService.emitirDespacho(
      id,
      despachoTexto,
      decisao,
      req.usuario!
    );

    return res.json({
      mensagem: 'Despacho emitido com sucesso',
      expediente
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message || 'Erro ao emitir despacho' });
  }
}

export async function arquivarExpediente(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const { observacoes } = req.body;

    const expediente = await expedienteService.arquivarExpediente(
      id,
      observacoes || 'Arquivamento concluído com sucesso.',
      req.usuario!
    );

    return res.json({
      mensagem: 'Expediente arquivado com sucesso',
      expediente
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message || 'Erro ao arquivar expediente' });
  }
}

export async function relatorioEstatistico(req: AuthRequest, res: Response) {
  try {
    const relatorio = await expedienteService.gerarRelatorioEstatisticos();
    return res.json({ relatorio });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message || 'Erro ao gerar relatório estatístico' });
  }
}
