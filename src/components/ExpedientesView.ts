export function ExpedientesView(): string {
  return `
    <div id="viewExpedientes" class="space-y-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <div class="flex items-center space-x-2 w-full sm:w-auto">
          <i class="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
          <input id="searchExp" oninput="loadExpedientes()" type="text" placeholder="Pesquisar n┬║ processo, assunto, titulo..." class="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 w-full sm:w-64">
        </div>

        <div class="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto">
          <select id="filterEstado" onchange="loadExpedientes()" class="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none">
            <option value="">Todos os Estados</option>
            <option value="REGISTADO">REGISTADO</option>
            <option value="EM_TRAMITACAO">EM_TRAMITACAO</option>
            <option value="DESPACHADO">DESPACHADO</option>
            <option value="ARQUIVADO">ARQUIVADO</option>
            <option value="REJEITADO">REJEITADO</option>
          </select>

          <select id="filterPrioridade" onchange="loadExpedientes()" class="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none">
            <option value="">Todas as Prioridades</option>
            <option value="BAIXA">BAIXA</option>
            <option value="NORMAL">NORMAL</option>
            <option value="URGENTE">URGENTE</option>
          </select>

          <button onclick="loadExpedientes()" class="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1.5 rounded text-slate-200 transition">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>

      <!-- List Table -->
      <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-3.5">N┬║ Processo</th>
                <th class="p-3.5">T├¡tulo / Assunto</th>
                <th class="p-3.5">Remetente</th>
                <th class="p-3.5">Sector Actual</th>
                <th class="p-3.5">Prioridade</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">Ac├º├╡es Workflow</th>
              </tr>
            </thead>
            <tbody id="expTableBody" class="divide-y divide-slate-700/60">
              <tr><td colspan="7" class="p-6 text-center text-slate-500">A carregar expedientes...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
