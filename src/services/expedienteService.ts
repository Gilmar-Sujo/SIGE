import { registrarAuditoria } from './auditService';

export interface ExpedienteData {
  id: number;
  numeroProcesso: string;
  titulo: string;
  assunto: string;
  remetente: string;
  prioridade: 'BAIXA' | 'NORMAL' | 'URGENTE';
  estado: 'REGISTADO' | 'EM_TRAMITACAO' | 'DESPACHADO' | 'ARQUIVADO' | 'REJEITADO';
  sectorAtual: string;
  autorId: number;
  autorNome: string;
  anexos?: string;
  criadoEm: Date;
  atualizadoEm: Date;
  tramitacoes: TramitacaoData[];
}

export interface TramitacaoData {
  id: number;
  expedienteId: number;
  origemSector: string;
  destinoSector: string;
  remetenteId: number;
  remetenteNome: string;
  despacho?: string;
  estado: 'PENDENTE' | 'CONCLUIDO' | 'DEVOLVIDO';
  dataEnvio: Date;
  dataDespacho?: Date;
}

// Initial seed data for Expedientes
export const inMemoryExpedientes: ExpedienteData[] = [
  {
    id: 1,
    numeroProcesso: 'EXP-2026/001',
    titulo: 'Pedido de Licença Sabática',
    assunto: 'Solicitação de licença docente para doutoramento na Universidade Eduardo Mondlane.',
    remetente: 'Prof. António Nhantumbo',
    prioridade: 'URGENTE',
    estado: 'EM_TRAMITACAO',
    sectorAtual: 'Recursos Humanos',
    autorId: 1,
    autorNome: 'Maria Silva',
    anexos: 'requerimento.pdf, certificado.pdf',
    criadoEm: new Date(Date.now() - 3600000 * 48),
    atualizadoEm: new Date(Date.now() - 3600000 * 24),
    tramitacoes: [
      {
        id: 1,
        expedienteId: 1,
        origemSector: 'Recepção',
        destinoSector: 'Recursos Humanos',
        remetenteId: 1,
        remetenteNome: 'Maria Silva (Recepcionista)',
        despacho: 'Encaminhado para verificação de elegibilidade e tempo de serviço.',
        estado: 'PENDENTE',
        dataEnvio: new Date(Date.now() - 3600000 * 40)
      }
    ]
  },
  {
    id: 2,
    numeroProcesso: 'EXP-2026/002',
    titulo: 'Aquisição de Material Didáctico',
    assunto: 'Proposta de cotação para compra de computadores e projectores para o laboratório de informática.',
    remetente: 'Sector de Tecnologia de Informação',
    prioridade: 'NORMAL',
    estado: 'DESPACHADO',
    sectorAtual: 'Direcção Geral',
    autorId: 1,
    autorNome: 'Maria Silva',
    anexos: 'cotacao_hardware.pdf',
    criadoEm: new Date(Date.now() - 3600000 * 72),
    atualizadoEm: new Date(Date.now() - 3600000 * 10),
    tramitacoes: [
      {
        id: 2,
        expedienteId: 2,
        origemSector: 'Recepção',
        destinoSector: 'Finanças',
        remetenteId: 1,
        remetenteNome: 'Maria Silva',
        despacho: 'Enviar para validação orçamental.',
        estado: 'CONCLUIDO',
        dataEnvio: new Date(Date.now() - 3600000 * 60)
      },
      {
        id: 3,
        expedienteId: 2,
        origemSector: 'Finanças',
        destinoSector: 'Direcção Geral',
        remetenteId: 2,
        remetenteNome: 'Carlos Bernardo (Chefe Finanças)',
        despacho: 'Existe cabimento orçamental. Recomenda-se aprovação.',
        estado: 'PENDENTE',
        dataEnvio: new Date(Date.now() - 3600000 * 20),
        dataDespacho: new Date(Date.now() - 3600000 * 10)
      }
    ]
  },
  {
    id: 3,
    numeroProcesso: 'EXP-2026/003',
    titulo: 'Relatório Trimestral de Assiduidade',
    assunto: 'Resumo estatístico de presença dos funcionários referente ao primeiro trimestre.',
    remetente: 'Departamento de RH',
    prioridade: 'BAIXA',
    estado: 'ARQUIVADO',
    sectorAtual: 'Arquivo Geral',
    autorId: 1,
    autorNome: 'Maria Silva',
    anexos: 'relatorio_assiduidade_q1.xlsx',
    criadoEm: new Date(Date.now() - 3600000 * 120),
    atualizadoEm: new Date(Date.now() - 3600000 * 30),
    tramitacoes: [
      {
        id: 4,
        expedienteId: 3,
        origemSector: 'Recursos Humanos',
        destinoSector: 'Direcção Geral',
        remetenteId: 2,
        remetenteNome: 'Carlos Bernardo',
        despacho: 'Para conhecimento da Direcção.',
        estado: 'CONCLUIDO',
        dataEnvio: new Date(Date.now() - 3600000 * 100)
      },
      {
        id: 5,
        expedienteId: 3,
        origemSector: 'Direcção Geral',
        destinoSector: 'Arquivo Geral',
        remetenteId: 3,
        remetenteNome: 'Dra. Ana Paula (Directora)',
        despacho: 'Tomado conhecimento. Proceda-se ao arquivamento.',
        estado: 'CONCLUIDO',
        dataEnvio: new Date(Date.now() - 3600000 * 50)
      }
    ]
  }
];

export async function criarExpediente(
  dados: {
    titulo: string;
    assunto: string;
    remetente: string;
    prioridade?: 'BAIXA' | 'NORMAL' | 'URGENTE';
    sectorDestino?: string;
    anexos?: string;
  },
  user: { id: number; nome: string; role: string }
) {
  const count = inMemoryExpedientes.length + 1;
  const numFormatted = String(count).padStart(3, '0');
  const numeroProcesso = `EXP-${new Date().getFullYear()}/${numFormatted}`;

  const novoExpediente: ExpedienteData = {
    id: count,
    numeroProcesso,
    titulo: dados.titulo,
    assunto: dados.assunto,
    remetente: dados.remetente,
    prioridade: dados.prioridade || 'NORMAL',
    estado: 'REGISTADO',
    sectorAtual: dados.sectorDestino || 'Recepção',
    autorId: user.id,
    autorNome: user.nome,
    anexos: dados.anexos || '',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    tramitacoes: []
  };

  inMemoryExpedientes.unshift(novoExpediente);

  // Registrar auditoria
  await registrarAuditoria(
    user.id,
    user.nome,
    user.role,
    'REGISTAR_EXPEDIENTE',
    'Expediente',
    `Registado expediente ${numeroProcesso}: "${dados.titulo}" destinado ao sector ${novoExpediente.sectorAtual}`
  );

  return novoExpediente;
}

export async function listarExpedientes(filtros?: {
  estado?: string;
  sector?: string;
  prioridade?: string;
  termo?: string;
}) {
  let lista = [...inMemoryExpedientes];

  if (filtros?.estado) {
    lista = lista.filter(e => e.estado === filtros.estado);
  }
  if (filtros?.sector) {
    lista = lista.filter(e => e.sectorAtual.toLowerCase().includes(filtros.sector!.toLowerCase()));
  }
  if (filtros?.prioridade) {
    lista = lista.filter(e => e.prioridade === filtros.prioridade);
  }
  if (filtros?.termo) {
    const t = filtros.termo.toLowerCase();
    lista = lista.filter(e =>
      e.numeroProcesso.toLowerCase().includes(t) ||
      e.titulo.toLowerCase().includes(t) ||
      e.assunto.toLowerCase().includes(t) ||
      e.remetente.toLowerCase().includes(t)
    );
  }

  return lista;
}

export async function obterExpedientePorId(id: number) {
  const expediente = inMemoryExpedientes.find(e => e.id === id);
  if (!expediente) {
    throw new Error('Expediente não encontrado');
  }
  return expediente;
}

export async function tramitarExpediente(
  expedienteId: number,
  destinoSector: string,
  despachoOuParecer: string,
  user: { id: number; nome: string; role: string }
) {
  const expediente = inMemoryExpedientes.find(e => e.id === expedienteId);
  if (!expediente) {
    throw new Error('Expediente não encontrado');
  }

  if (expediente.estado === 'ARQUIVADO') {
    throw new Error('Não é possível tramitar um expediente arquivado');
  }

  const origemSector = expediente.sectorAtual;
  expediente.sectorAtual = destinoSector;
  expediente.estado = 'EM_TRAMITACAO';
  expediente.atualizadoEm = new Date();

  const novaTramitacao: TramitacaoData = {
    id: Date.now(),
    expedienteId,
    origemSector,
    destinoSector,
    remetenteId: user.id,
    remetenteNome: `${user.nome} (${user.role})`,
    despacho: despachoOuParecer,
    estado: 'PENDENTE',
    dataEnvio: new Date()
  };

  expediente.tramitacoes.push(novaTramitacao);

  await registrarAuditoria(
    user.id,
    user.nome,
    user.role,
    'TRAMITAR_EXPEDIENTE',
    'Tramitacao',
    `Tramitado ${expediente.numeroProcesso} do sector ${origemSector} para ${destinoSector}. Parecer: "${despachoOuParecer}"`
  );

  return expediente;
}

export async function emitirDespacho(
  expedienteId: number,
  despachoTexto: string,
  decisao: 'APROVADO' | 'REJEITADO' | 'SOLICITAR_INFORMACAO',
  user: { id: number; nome: string; role: string }
) {
  const expediente = inMemoryExpedientes.find(e => e.id === expedienteId);
  if (!expediente) {
    throw new Error('Expediente não encontrado');
  }

  let novoEstado: ExpedienteData['estado'] = 'DESPACHADO';
  if (decisao === 'REJEITADO') {
    novoEstado = 'REJEITADO';
  }

  expediente.estado = novoEstado;
  expediente.atualizadoEm = new Date();

  const ultimaTramitacao = expediente.tramitacoes[expediente.tramitacoes.length - 1];
  if (ultimaTramitacao) {
    ultimaTramitacao.despacho = `[${decisao}] ${despachoTexto}`;
    ultimaTramitacao.estado = 'CONCLUIDO';
    ultimaTramitacao.dataDespacho = new Date();
  } else {
    expediente.tramitacoes.push({
      id: Date.now(),
      expedienteId,
      origemSector: expediente.sectorAtual,
      destinoSector: expediente.sectorAtual,
      remetenteId: user.id,
      remetenteNome: `${user.nome} (${user.role})`,
      despacho: `[${decisao}] ${despachoTexto}`,
      estado: 'CONCLUIDO',
      dataEnvio: new Date(),
      dataDespacho: new Date()
    });
  }

  await registrarAuditoria(
    user.id,
    user.nome,
    user.role,
    'EMITIR_DESPACHO',
    'Expediente',
    `Despacho emitido para ${expediente.numeroProcesso} - Decisão: ${decisao}. Observações: ${despachoTexto}`
  );

  return expediente;
}

export async function arquivarExpediente(
  expedienteId: number,
  observacoes: string,
  user: { id: number; nome: string; role: string }
) {
  const expediente = inMemoryExpedientes.find(e => e.id === expedienteId);
  if (!expediente) {
    throw new Error('Expediente não encontrado');
  }

  expediente.estado = 'ARQUIVADO';
  expediente.sectorAtual = 'Arquivo Geral';
  expediente.atualizadoEm = new Date();

  expediente.tramitacoes.push({
    id: Date.now(),
    expedienteId,
    origemSector: expediente.sectorAtual,
    destinoSector: 'Arquivo Geral',
    remetenteId: user.id,
    remetenteNome: `${user.nome} (${user.role})`,
    despacho: `[ARQUIVAMENTO] ${observacoes}`,
    estado: 'CONCLUIDO',
    dataEnvio: new Date(),
    dataDespacho: new Date()
  });

  await registrarAuditoria(
    user.id,
    user.nome,
    user.role,
    'ARQUIVAR_EXPEDIENTE',
    'Expediente',
    `Arquivado o expediente ${expediente.numeroProcesso}. Motivo/Obs: ${observacoes}`
  );

  return expediente;
}

export async function gerarRelatorioEstatisticos() {
  const total = inMemoryExpedientes.length;
  const porEstado: Record<string, number> = {
    REGISTADO: 0,
    EM_TRAMITACAO: 0,
    DESPACHADO: 0,
    ARQUIVADO: 0,
    REJEITADO: 0
  };

  const porPrioridade: Record<string, number> = {
    BAIXA: 0,
    NORMAL: 0,
    URGENTE: 0
  };

  const porSector: Record<string, number> = {};
  let totalTramitacoes = 0;
  let urgentesPendentes = 0;
  const todasTramitacoes: any[] = [];

  inMemoryExpedientes.forEach(e => {
    porEstado[e.estado] = (porEstado[e.estado] || 0) + 1;
    porPrioridade[e.prioridade] = (porPrioridade[e.prioridade] || 0) + 1;
    porSector[e.sectorAtual] = (porSector[e.sectorAtual] || 0) + 1;

    if (e.prioridade === 'URGENTE' && e.estado !== 'ARQUIVADO' && e.estado !== 'DESPACHADO') {
      urgentesPendentes++;
    }

    if (e.tramitacoes && Array.isArray(e.tramitacoes)) {
      totalTramitacoes += e.tramitacoes.length;
      e.tramitacoes.forEach(t => {
        todasTramitacoes.push({
          expedienteId: e.id,
          numeroProcesso: e.numeroProcesso,
          titulo: e.titulo,
          origemSector: t.origemSector,
          destinoSector: t.destinoSector,
          remetenteNome: t.remetenteNome,
          despacho: t.despacho,
          dataEnvio: t.dataEnvio
        });
      });
    }
  });

  // Sort recent movements by dataEnvio descending
  todasTramitacoes.sort((a, b) => new Date(b.dataEnvio).getTime() - new Date(a.dataEnvio).getTime());
  const ultimasTramitacoes = todasTramitacoes.slice(0, 6);

  const concluidos = (porEstado.DESPACHADO || 0) + (porEstado.ARQUIVADO || 0);
  const taxaResolucao = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  const mediaTramitacoesPorProcesso = total > 0 ? (totalTramitacoes / total).toFixed(1) : '0';

  return {
    total,
    porEstado,
    porPrioridade,
    porSector,
    totalTramitacoes,
    urgentesPendentes,
    taxaResolucao,
    mediaTramitacoesPorProcesso,
    ultimasTramitacoes,
    geradoEm: new Date()
  };
}
