export function Navigation(): string {
  return `
    <aside id="sidebarNav" class="w-64 bg-slate-800/95 border-r border-slate-700/80 flex flex-col justify-between transition-all duration-300 shrink-0 min-h-[calc(100vh-57px)]">
      <div class="p-4 space-y-6">
        <!-- Institution Badge -->
        <div class="bg-slate-900/60 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center text-sm shadow">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <div class="overflow-hidden">
            <div class="text-xs font-bold text-slate-100 truncate">Governo de Moçambique</div>
            <div class="text-[10px] text-sky-400 font-mono flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Serviços Públicos
            </div>
          </div>
        </div>

        <!-- Section 1: Principal Navigation -->
        <div class="space-y-1">
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Menu Principal
          </div>

          <button id="tabRelatorios" onclick="switchTab('relatorios')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold bg-sky-600/20 text-sky-300 border border-sky-500/30 transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-chart-pie text-sm"></i>
              <span>Dashboard & Analytics</span>
            </div>
            <span class="bg-sky-500/20 text-sky-300 text-[10px] font-mono px-1.5 py-0.5 rounded">KPIs</span>
          </button>

          <button id="tabExpedientes" onclick="switchTab('expedientes')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-folder-open text-sm text-slate-400 group-hover:text-sky-400 transition"></i>
              <span>Expedientes & Tramitação</span>
            </div>
          </button>

          <button id="tabNovoExpediente" onclick="switchTab('novo')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-circle-plus text-sm text-slate-400 group-hover:text-emerald-400 transition"></i>
              <span>Registar Entrada</span>
            </div>
            <span class="bg-emerald-950 text-emerald-400 text-[9px] font-bold border border-emerald-800/80 px-1.5 py-0.5 rounded">+ Novo</span>
          </button>
        </div>

        <!-- Section 2: Administration & Security (Visible ONLY to Administrador) -->
        <div id="sidebarAdminGroup" class="space-y-1 pt-2 border-t border-slate-700/60 hidden">
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Gestão & Segurança
          </div>

          <button id="tabUtilizadores" onclick="switchTab('utilizadores')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-users-gear text-sm text-slate-400 group-hover:text-amber-400 transition"></i>
              <span>Gestão de Utilizadores</span>
            </div>
            <span class="bg-amber-950 text-amber-300 text-[9px] border border-amber-800/80 px-1.5 py-0.5 rounded font-mono">Admin</span>
          </button>

          <button id="tabAuditoria" onclick="switchTab('auditoria')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-clock-rotate-left text-sm text-slate-400 group-hover:text-indigo-400 transition"></i>
              <span>Audit Log & Trilha</span>
            </div>
          </button>

          <button id="tabRBAC" onclick="switchTab('rbac')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-shield-halved text-sm text-slate-400 group-hover:text-purple-400 transition"></i>
              <span>Matriz de Permissões</span>
            </div>
            <span class="bg-purple-950 text-purple-300 text-[9px] border border-purple-800/80 px-1.5 py-0.5 rounded font-mono">RBAC</span>
          </button>
        </div>
      </div>

      <!-- Sidebar Bottom System Info & Active User Session -->
      <div class="border-t border-slate-700/80 bg-slate-900/60 text-xs">
        <div id="userSessionSidebarCard" class="p-3 border-b border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Sessão Activa</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div class="flex items-center gap-2.5">
            <div id="userSidebarAvatar" class="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0 shadow overflow-hidden">
              <i class="fa-solid fa-user-shield text-sky-400"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div id="userNameSidebar" class="font-bold text-slate-100 text-xs truncate">--</div>
              <div id="userRoleSidebar" class="text-[10px] text-sky-400 font-mono font-semibold truncate">--</div>
              <div id="userEmailSidebar" class="text-[9px] text-slate-400 truncate">--</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1.5 pt-1">
            <button onclick="openProfileModal()" class="w-full bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-sky-200 border border-slate-700 py-1 px-2 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer" title="Editar Perfil">
              <i class="fa-solid fa-gear"></i>
              <span>Perfil</span>
            </button>
            <button onclick="logout()" class="w-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-rose-100 border border-rose-800/80 py-1 px-2 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer" title="Sair da Conta">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>

        <div class="p-3 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Servidor SIGE:</span>
            <span class="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <i class="fa-solid fa-circle text-[8px]"></i> On-line
            </span>
          </div>
          <div class="text-[10px] text-slate-500 font-mono text-center">
            SIGE-RBAC Moçambique &copy; 2026
          </div>
        </div>
      </div>
    </aside>
  `;
}