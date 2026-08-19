export function RbacMatrixView(): string {
  return `
    <div id="viewRBAC" class="hidden space-y-4">
      <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <h2 class="text-base font-bold text-slate-100 flex items-center gap-2">
          <i class="fa-solid fa-user-gear text-sky-400"></i> Matriz de Controlo de Acesso Baseado em Papéis (RBAC)
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Visão detalhada das permissões e atribuições funcionais por perfil no sistema SIGE.</p>
      </div>

      <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-3.5">Perfil de Acesso</th>
                <th class="p-3.5">Registar Entrada</th>
                <th class="p-3.5">Tramitar / Encaminhar</th>
                <th class="p-3.5">Emitir Despacho</th>
                <th class="p-3.5">Arquivar Processos</th>
                <th class="p-3.5">Visualizar Auditoria</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/60 text-slate-300">
              <tr>
                <td class="p-3.5 font-bold text-sky-400 flex items-center gap-2"><i class="fa-solid fa-concierge-bell"></i> Recepcionista</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-amber-400 flex items-center gap-2"><i class="fa-solid fa-user-tie"></i> Chefe de Sector</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido (Parecer)</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-emerald-400 flex items-center gap-2"><i class="fa-solid fa-signature"></i> Director</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Decisão Final</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Permitido</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Relatórios Globais</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-purple-400 flex items-center gap-2"><i class="fa-solid fa-box-archive"></i> Arquivista</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Gestão de Arquivo</td>
                <td class="p-3.5 text-rose-400"><i class="fa-solid fa-xmark"></i> Negado</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-sky-300 flex items-center gap-2"><i class="fa-solid fa-key"></i> Administrador</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Total</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Total</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Total</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Total</td>
                <td class="p-3.5 text-emerald-400"><i class="fa-solid fa-check"></i> Auditoria Completa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
