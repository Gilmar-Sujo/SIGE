export function Header(): string {
  return `
    <header class="bg-slate-800/90 backdrop-blur border-b border-slate-700/80 sticky top-0 z-50 px-4 md:px-6 py-2.5">
      <div class="w-full flex items-center justify-between gap-4">
        
        <!-- Left: Sidebar Toggle + Brand Logo -->
        <div class="flex items-center space-x-3">
          <button onclick="toggleSidebar()" class="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/60 hover:bg-slate-700 border border-slate-700/80 transition text-sm">
            <i class="fa-solid fa-bars text-base"></i>
          </button>
          
          <div class="flex items-center space-x-2.5">
            <div class="bg-gradient-to-tr from-sky-600 to-indigo-600 text-white p-2 rounded-lg shadow-sm border border-sky-400/30">
              <i class="fa-solid fa-folder-tree text-lg"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-extrabold text-slate-100 tracking-tight">SIGE</span>
                <span class="text-[10px] font-mono font-bold text-sky-300 bg-sky-950 border border-sky-800 px-1.5 py-0.5 rounded uppercase">v2.4</span>
              </div>
              <p class="text-[11px] text-slate-400 hidden sm:block">Sistema Integrado de Gestão de Expedientes</p>
            </div>
          </div>
        </div>

        <!-- Center: Quick Global Search Box -->
        <div class="hidden md:flex flex-1 max-w-md mx-4">
          <div class="relative w-full">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input type="text" id="globalNavSearch" onkeyup="handleGlobalNavSearch(event)" placeholder="Pesquisar por N.º Processo, Assunto ou Sector..." class="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition" />
          </div>
        </div>

        <!-- Right: Notifications, Active User & Logout -->
        <div class="flex items-center space-x-3">
          <!-- Notification Bell & Popover Menu -->
          <div class="relative">
            <button onclick="toggleNotificationsMenu(event)" id="btnNotificacoes" title="Notificações e Alertas em Tempo Real" class="relative p-2 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition focus:outline-none">
              <i class="fa-solid fa-bell text-sm"></i>
              <span id="notifBadge" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-pulse border border-slate-900 shadow">0</span>
            </button>

            <!-- Notifications Popover Dropdown -->
            <div id="notificationsDropdown" class="hidden absolute right-0 mt-2 w-80 md:w-96 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl z-50 overflow-hidden text-xs">
              <div class="bg-slate-800/90 p-3 border-b border-slate-700/80 flex items-center justify-between">
                <div class="font-bold text-slate-100 flex items-center gap-2">
                  <i class="fa-solid fa-bell text-sky-400"></i>
                  <span>Notificações do Sistema</span>
                  <span id="notifUnreadHeaderCount" class="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] px-1.5 py-0.2 rounded font-mono">0 não lidas</span>
                </div>
                <button onclick="markAllNotificationsRead()" class="text-[10px] text-sky-400 hover:text-sky-300 font-medium hover:underline transition flex items-center gap-1">
                  <i class="fa-solid fa-check-double"></i> Limpar
                </button>
              </div>

              <div id="notifListContainer" class="max-h-80 overflow-y-auto divide-y divide-slate-800">
                <div class="p-4 text-center text-slate-500 italic">A carregar notificações...</div>
              </div>

              <div class="bg-slate-950 p-2.5 border-t border-slate-800 text-center">
                <button onclick="switchTab('auditoria'); toggleNotificationsMenu(event)" class="text-[11px] text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 w-full py-1">
                  <i class="fa-solid fa-clock-rotate-left text-indigo-400"></i> Ver Registo Completo de Auditoria
                </button>
              </div>
            </div>
          </div>

          <!-- User Info Badge & Settings -->
          <div id="userInfo" class="flex items-center space-x-2 border-l border-slate-700/80 pl-3">
            <div id="userHeaderAvatar" class="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-300 flex items-center justify-center font-bold text-xs shadow-inner shrink-0 overflow-hidden">
              <i class="fa-solid fa-user-check text-sky-400"></i>
            </div>
            <div class="text-left">
              <div id="userName" class="text-xs font-bold text-slate-100 leading-tight truncate max-w-[120px] sm:max-w-[160px]">--</div>
              <span id="userRoleBadge" class="inline-block text-[9px] text-sky-300 font-semibold font-mono bg-sky-950/80 border border-sky-800 px-1.5 py-0.2 rounded-full">--</span>
            </div>
            <button onclick="openProfileModal()" title="Definições e Perfil de Utilizador" class="p-1.5 text-slate-400 hover:text-sky-300 hover:bg-slate-700/60 rounded-lg transition cursor-pointer ml-1">
              <i class="fa-solid fa-gear text-xs"></i>
            </button>
          </div>

          <!-- Logout Button (Sair) -->
          <button onclick="logout()" id="btnLogout" title="Encerrar Sessão no SIGE" class="text-xs bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 font-bold shadow-sm cursor-pointer">
            <i class="fa-solid fa-right-from-bracket text-xs"></i> <span>Sair</span>
          </button>

          <!-- Login Button (Shown if logged out) -->
          <button onclick="openAuthModal('login')" id="btnLogin" title="Iniciar Sessão" class="hidden text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-md cursor-pointer">
            <i class="fa-solid fa-right-to-bracket text-xs"></i> <span>Entrar</span>
          </button>
        </div>

      </div>
    </header>
  `;
}

