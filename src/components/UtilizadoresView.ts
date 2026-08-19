export function UtilizadoresView(): string {
  return `
    <div id="viewUtilizadores" class="hidden space-y-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <div>
          <h2 class="text-base font-bold text-slate-100 flex items-center gap-2">
            <i class="fa-solid fa-users-gear text-sky-400"></i> Gestão de Utilizadores & Controlo de Acesso (RBAC)
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">Gerencie contas, atribua perfis (roles) e controle sectores funcionais do sistema.</p>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="openModal('modalNovoUtilizador')" class="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-3 py-1.5 rounded shadow transition flex items-center gap-1.5">
            <i class="fa-solid fa-user-plus"></i> Novo Utilizador
          </button>
          <button onclick="loadUtilizadores()" class="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1.5 rounded text-slate-200 transition">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>

      <!-- User Statistics Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-slate-400 font-medium">Total de Utilizadores</div>
          <div id="userStatTotal" class="text-2xl font-bold text-sky-400 mt-1">--</div>
        </div>
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-slate-400 font-medium">Recepcionistas</div>
          <div id="userStatRecep" class="text-2xl font-bold text-indigo-400 mt-1">--</div>
        </div>
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-slate-400 font-medium">Chefes & Directores</div>
          <div id="userStatChefes" class="text-2xl font-bold text-amber-400 mt-1">--</div>
        </div>
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div class="text-slate-400 font-medium">Administradores</div>
          <div id="userStatAdmins" class="text-2xl font-bold text-emerald-400 mt-1">--</div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-3.5">ID / Nome</th>
                <th class="p-3.5">Email de Acesso</th>
                <th class="p-3.5">Sector</th>
                <th class="p-3.5">Perfil RBAC</th>
                <th class="p-3.5">Estado</th>
                <th class="p-3.5 text-right">Ações de Gestão</th>
              </tr>
            </thead>
            <tbody id="usersTableBody" class="divide-y divide-slate-700/60">
              <tr><td colspan="6" class="p-6 text-center text-slate-500">A carregar utilizadores...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
