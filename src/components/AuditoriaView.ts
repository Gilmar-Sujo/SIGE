export function AuditoriaView(): string {
  return `
    <div id="viewAuditoria" class="hidden space-y-4">
      <div class="flex items-center justify-between bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <div>
          <h2 class="text-base font-bold text-slate-100 flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-sky-400"></i> Trilha de Auditoria & Rastreabilidade do Sistema
          </h2>
          <p class="text-xs text-slate-400">Todas as acções administrativas são registadas imutavelmente com perfil e horário.</p>
        </div>
        <button onclick="loadAuditoria()" class="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1.5 rounded text-slate-200 transition">
          <i class="fa-solid fa-rotate-right mr-1"></i> Atualizar Logs
        </button>
      </div>

      <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-3">Data / Hora</th>
                <th class="p-3">Utilizador</th>
                <th class="p-3">Perfil</th>
                <th class="p-3">Acção</th>
                <th class="p-3">Entidade</th>
                <th class="p-3">Detalhes</th>
              </tr>
            </thead>
            <tbody id="auditTableBody" class="divide-y divide-slate-700/60">
              <tr><td colspan="6" class="p-6 text-center text-slate-500">A carregar logs de auditoria...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
