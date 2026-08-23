let prismaInstance: any = null;

export const inMemoryAuditLogs: any[] = [
  {
    id: 1,
    userId: 1,
    userNome: 'Maria Silva',
    userRole: 'Recepcionista',
    acao: 'REGISTAR_EXPEDIENTE',
    entidade: 'Expediente',
    detalhes: 'Criado o expediente EXP-2026/001 - Solicitacao de Transferencia Escolar',
    ip: '127.0.0.1',
    timestamp: new Date(Date.now() - 3600000 * 24 * 2)
  },
  {
    id: 2,
    userId: 1,
    userNome: 'Maria Silva',
    userRole: 'Recepcionista',
    acao: 'TRAMITAR_EXPEDIENTE',
    entidade: 'Tramitacao',
    detalhes: 'Tramitado EXP-2026/001 da Recepcao para Recursos Humanos',
    ip: '127.0.0.1',
    timestamp: new Date(Date.now() - 3600000 * 24 * 1.8)
  },
  {
    id: 3,
    userId: 2,
    userNome: 'Carlos Bernardo',
    userRole: 'Chefe de Sector',
    acao: 'EMITIR_DESPACHO',
    entidade: 'Expediente',
    detalhes: 'Emitido parecer favoravel e encaminhado ao Director no EXP-2026/001',
    ip: '127.0.0.1',
    timestamp: new Date(Date.now() - 3600000 * 24 * 1)
  },
  {
    id: 4,
    userId: 3,
    userNome: 'Dra. Ana Paula',
    userRole: 'Director',
    acao: 'DESPACHO_FINAL',
    entidade: 'Expediente',
    detalhes: 'Aprovado oficialmente o expediente EXP-2026/001. Encaminhado ao Arquivo.',
    ip: '127.0.0.1',
    timestamp: new Date(Date.now() - 3600000 * 12)
  }
];

export async function registrarAuditoria(
  userId: number | null,
  userNome: string,
  userRole: string,
  acao: string,
  entidade: string,
  detalhes: string,
  ip?: string
) {
  const logItem = {
    id: inMemoryAuditLogs.length + 1,
    userId,
    userNome,
    userRole,
    acao,
    entidade,
    detalhes,
    ip: ip || '127.0.0.1',
    timestamp: new Date()
  };

  inMemoryAuditLogs.unshift(logItem);

  if (prismaInstance) {
    try {
      await prismaInstance.auditLog.create({
        data: {
          userId,
          userNome,
          userRole,
          acao,
          entidade,
          detalhes,
          ip: ip || '127.0.0.1'
        }
      });
    } catch (err: any) {
      console.warn('[AuditService] Failed to persist log to DB:', err.message);
    }
  }

  return logItem;
}

export async function listarAuditoria(filtros?: { acao?: string; userRole?: string; termo?: string }) {
  let logs = [...inMemoryAuditLogs];

  if (filtros?.acao) {
    logs = logs.filter(l => l.acao.toLowerCase() === filtros.acao?.toLowerCase());
  }
  if (filtros?.userRole) {
    logs = logs.filter(l => l.userRole.toLowerCase() === filtros.userRole?.toLowerCase());
  }
  if (filtros?.termo) {
    const t = filtros.termo.toLowerCase();
    logs = logs.filter(l => 
      l.detalhes.toLowerCase().includes(t) || 
      l.userNome.toLowerCase().includes(t) ||
      l.acao.toLowerCase().includes(t)
    );
  }

  return logs;
}

export async function obterEstatisticasAuditoria() {
  const totalAcoes = inMemoryAuditLogs.length;
  const acoesPorRole: Record<string, number> = {};
  const acoesPorTipo: Record<string, number> = {};

  inMemoryAuditLogs.forEach(l => {
    acoesPorRole[l.userRole] = (acoesPorRole[l.userRole] || 0) + 1;
    acoesPorTipo[l.acao] = (acoesPorTipo[l.acao] || 0) + 1;
  });

  return {
    totalAcoes,
    acoesPorRole,
    acoesPorTipo,
    ultimosLogs: inMemoryAuditLogs.slice(0, 10)
  };
}
