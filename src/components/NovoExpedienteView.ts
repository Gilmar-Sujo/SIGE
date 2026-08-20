export function NovoExpedienteView(): string {
  return `
    <div id="viewNovoExpediente" class="hidden max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
      <div class="border-b border-slate-700 pb-3">
        <h2 class="text-lg font-bold text-slate-100 flex items-center gap-2">
          <i class="fa-solid fa-file-circle-plus text-sky-400"></i> Registar Nova Entrada de Expediente
        </h2>
        <p class="text-xs text-slate-400 mt-1">
          Requer perfil: <span class="text-sky-400 font-semibold">Recepcionista</span> ou <span class="text-sky-400 font-semibold">Administrador</span>
        </p>
      </div>

      <form id="formNovoExpediente" onsubmit="handleRegistrarExpediente(event)" class="space-y-4 text-xs">
        <div>
          <label class="block text-slate-300 mb-1 font-semibold">Título do Expediente *</label>
          <input id="expTitulo" required type="text" placeholder="Ex: Pedido de Transferência Escolar" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:border-sky-500 focus:outline-none">
        </div>

        <div>
          <label class="block text-slate-300 mb-1 font-semibold">Remetente (Entidade / Cidadão) *</label>
          <input id="expRemetente" required type="text" placeholder="Ex: Manuel João Mondlane" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:border-sky-500 focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Prioridade</label>
            <select id="expPrioridade" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
              <option value="NORMAL">NORMAL</option>
              <option value="BAIXA">BAIXA</option>
              <option value="URGENTE">URGENTE</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Sector Inicial / Destino</label>
            <select id="expSectorDestino" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
              <option value="Recepção">Recepção</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Finanças">Finanças</option>
              <option value="Secretaria Geral">Secretaria Geral</option>
              <option value="Direcção Geral">Direcção Geral</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-slate-300 mb-1 font-semibold">Assunto / Descrição do Processo *</label>
          <textarea id="expAssunto" required rows="3" placeholder="Forneça os detalhes e fundamentação do expediente..." class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:border-sky-500 focus:outline-none"></textarea>
        </div>

        <div>
          <label class="block text-slate-300 mb-1 font-semibold">Anexos / Documentos Suporte (Opcional)</label>
          <input id="expAnexos" type="text" placeholder="Ex: requerimento_assinado.pdf, bi_copia.pdf" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:border-sky-500 focus:outline-none">
        </div>

        <button type="submit" class="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 rounded transition shadow text-xs">
          <i class="fa-solid fa-paper-plane mr-1"></i> Registar e Gerar Processo
        </button>
      </form>
    </div>
  `;
}
