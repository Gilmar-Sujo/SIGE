export function ClientScripts(): string {
  return `
    <script>
      let currentToken = localStorage.getItem('sige_token') || '';
      let currentUser = JSON.parse(localStorage.getItem('sige_user') || 'null');
      let currentActiveTab = 'relatorios';
      let currentActiveRoleDashboard = '';

      window.addEventListener('DOMContentLoaded', async () => {
        if (!currentToken || !currentUser) {
          await quickLogin('admin@sige.gov.mz', '123456');
        } else {
          updateUserBadge();
          applyRolePermissions();
          switchTab('relatorios');
          loadNotifications();
        }
      });

      function showToast(msg, isError = false) {
        const toast = document.getElementById('toast');
        toast.className = \`fixed bottom-5 right-5 border text-xs px-4 py-3 rounded-lg shadow-xl transition-all duration-300 z-50 \${
          isError ? 'bg-rose-900/90 border-rose-700 text-rose-200' : 'bg-emerald-900/90 border-emerald-700 text-emerald-200'
        }\`;
        toast.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
      }

      async function quickLogin(email, senha) {
        try {
          const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.erro || 'Falha ao autenticar.');
          }

          const data = await res.json();
          setSession(data.token, data.user);
        } catch (err) {
          showToast('Erro ao autenticar: ' + err.message, true);
        }
      }

      function setSession(token, user) {
        currentToken = token;
        currentUser = user;
        localStorage.setItem('sige_token', token);
        localStorage.setItem('sige_user', JSON.stringify(user));
        updateUserBadge();
        applyRolePermissions();
        showToast(\`Sessão iniciada como \${user.nome} (\${user.role})\`);
        closeModal('modalAuth');
        switchTab('relatorios');
      }

      function logout() {
        localStorage.removeItem('sige_token');
        localStorage.removeItem('sige_user');
        currentToken = '';
        currentUser = null;
        updateUserBadge();
        openAuthModal('login');
        showToast('Sessão terminada.');
      }

      function updateUserBadge() {
        const info = document.getElementById('userInfo');
        const btnLogout = document.getElementById('btnLogout');
        const btnLogin = document.getElementById('btnLogin');

        const userNameEl = document.getElementById('userName');
        const userRoleBadgeEl = document.getElementById('userRoleBadge');

        const userNameSidebar = document.getElementById('userNameSidebar');
        const userRoleSidebar = document.getElementById('userRoleSidebar');
        const userEmailSidebar = document.getElementById('userEmailSidebar');
        const userSessionSidebarCard = document.getElementById('userSessionSidebarCard');

        const headerAvatar = document.getElementById('userHeaderAvatar');
        const sidebarAvatar = document.getElementById('userSidebarAvatar');

        if (currentUser) {
          if (userNameEl) userNameEl.textContent = currentUser.nome;
          if (userRoleBadgeEl) userRoleBadgeEl.textContent = currentUser.role;

          if (userNameSidebar) userNameSidebar.textContent = currentUser.nome;
          if (userRoleSidebar) userRoleSidebar.textContent = currentUser.role + (currentUser.sector ? ' (' + currentUser.sector + ')' : '');
          if (userEmailSidebar) userEmailSidebar.textContent = currentUser.email;

          if (currentUser.foto) {
            const avatarHtml = '<img src="' + currentUser.foto + '" class="w-full h-full object-cover rounded-full" alt="Foto">';
            if (headerAvatar) headerAvatar.innerHTML = avatarHtml;
            if (sidebarAvatar) sidebarAvatar.innerHTML = avatarHtml;
          } else {
            if (headerAvatar) headerAvatar.innerHTML = '<i class="fa-solid fa-user-check text-sky-400"></i>';
            if (sidebarAvatar) sidebarAvatar.innerHTML = '<i class="fa-solid fa-user-shield text-sky-400"></i>';
          }

          if (info) info.classList.remove('hidden');
          if (btnLogout) btnLogout.classList.remove('hidden');
          if (btnLogin) btnLogin.classList.add('hidden');
          if (userSessionSidebarCard) userSessionSidebarCard.classList.remove('hidden');
        } else {
          if (userNameEl) userNameEl.textContent = 'Não autenticado';
          if (userRoleBadgeEl) userRoleBadgeEl.textContent = 'Visitante';

          if (userNameSidebar) userNameSidebar.textContent = 'Sem Sessão';
          if (userRoleSidebar) userRoleSidebar.textContent = 'Visitante';
          if (userEmailSidebar) userEmailSidebar.textContent = '--';

          if (headerAvatar) headerAvatar.innerHTML = '<i class="fa-solid fa-user-check text-sky-400"></i>';
          if (sidebarAvatar) sidebarAvatar.innerHTML = '<i class="fa-solid fa-user-shield text-sky-400"></i>';

          if (info) info.classList.add('hidden');
          if (btnLogout) btnLogout.classList.add('hidden');
          if (btnLogin) btnLogin.classList.remove('hidden');
          if (userSessionSidebarCard) userSessionSidebarCard.classList.add('hidden');
        }
      }

      function applyRolePermissions() {
        const sidebarAdminGroup = document.getElementById('sidebarAdminGroup');
        const tabNovoExpediente = document.getElementById('tabNovoExpediente');
        const roleSwitcher = document.getElementById('roleSwitcherContainer');

        const role = currentUser ? currentUser.role : 'Guest';
        const isAdmin = role === 'Administrador';
        const isRecep = role === 'Recepcionista';

        // 1. Gestão & Segurança na Sidebar - Apenas para Administrador
        if (sidebarAdminGroup) {
          if (isAdmin) sidebarAdminGroup.classList.remove('hidden');
          else sidebarAdminGroup.classList.add('hidden');
        }

        // 2. Tab Registar Entrada na Sidebar - Para Recepcionista e Administrador
        if (tabNovoExpediente) {
          if (isRecep || isAdmin) tabNovoExpediente.classList.remove('hidden');
          else tabNovoExpediente.classList.add('hidden');
        }

        if (roleSwitcher) {
          roleSwitcher.classList.remove('hidden');
        }

        // 3. Altera a visão do Dashboard AUTOMATICAMENTE para a do utilizador logado
        if (currentUser && currentUser.role) {
          currentActiveRoleDashboard = currentUser.role;
          switchRoleDashboard(currentUser.role);
        }

        // 4. Redireciona utilizadores sem permissão admin caso estejam numa tab restrita
        if (!isAdmin && ['utilizadores', 'auditoria', 'rbac'].includes(currentActiveTab)) {
          switchTab('expedientes');
        }
      }

      function toggleSidebar() {
        const sidebar = document.getElementById('sidebarNav');
        if (sidebar) {
          sidebar.classList.toggle('hidden');
        }
      }

      function handleGlobalNavSearch(e) {
        if (e.key === 'Enter') {
          const val = e.target.value.trim();
          if (val) {
            switchTab('expedientes');
            const searchInput = document.getElementById('searchExp');
            if (searchInput) {
              searchInput.value = val;
              loadExpedientes();
            }
          }
        }
      }

      function switchTab(tab) {
        currentActiveTab = tab;
        if ((tab === 'utilizadores' || tab === 'rbac') && currentUser) {
          const canManageUsers = currentUser.role === 'Administrador' || currentUser.role === 'Director';
          if (!canManageUsers) {
            showToast('Acesso Reservado: Apenas o Administrador e Director têm acesso à lista de utilizadores.', true);
            tab = 'relatorios';
          }
        }

        ['Expedientes', 'NovoExpediente', 'Auditoria', 'Relatorios', 'Utilizadores', 'RBAC'].forEach(t => {
          const el = document.getElementById('view' + t);
          const btn = document.getElementById('tab' + t);
          if (el) el.classList.add('hidden');
          if (btn) {
            btn.className = 'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-700/60 hover:text-white transition group';
          }
        });

        const activeKey = tab === 'novo' ? 'NovoExpediente' : (tab === 'rbac' ? 'RBAC' : tab.charAt(0).toUpperCase() + tab.slice(1));
        const activeView = document.getElementById('view' + activeKey);
        const activeBtn = document.getElementById('tab' + activeKey);

        if (activeView) activeView.classList.remove('hidden');
        if (activeBtn) {
          activeBtn.className = 'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold bg-sky-600/20 text-sky-300 border border-sky-500/30 transition group';
        }

        if (tab === 'expedientes') loadExpedientes();
        if (tab === 'auditoria') loadAuditoria();
        if (tab === 'relatorios') loadRelatorios();
        if (tab === 'utilizadores') loadUtilizadores();
      }


      async function loadExpedientes() {
        const filterEstadoEl = document.getElementById('filterEstado');
        const filterPrioridadeEl = document.getElementById('filterPrioridade');
        const searchExpEl = document.getElementById('searchExp');

        const estado = filterEstadoEl ? filterEstadoEl.value : '';
        const prioridade = filterPrioridadeEl ? filterPrioridadeEl.value : '';
        const termo = searchExpEl ? searchExpEl.value : '';

        const query = new URLSearchParams();
        if (estado) query.append('estado', estado);
        if (prioridade) query.append('prioridade', prioridade);
        if (termo) query.append('termo', termo);

        try {
          const res = await fetch('/expedientes?' + query.toString(), {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          renderExpedientesTable(data.expedientes || []);
        } catch (err) {
          showToast('Erro ao carregar expedientes: ' + err.message, true);
        }
      }

      function renderExpedientesTable(expedientes) {
        const tbody = document.getElementById('expTableBody');
        if (!tbody) return;

        if (!expedientes || expedientes.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-500">Nenhum expediente encontrado.</td></tr>';
          return;
        }

        tbody.innerHTML = expedientes.map(exp => {
          const badgePrioridade = exp.prioridade === 'URGENTE' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
            exp.prioridade === 'BAIXA' ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-amber-500/20 text-amber-300 border-amber-500/30';

          const badgeEstado = exp.estado === 'REGISTADO' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
            exp.estado === 'EM_TRAMITACAO' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
            exp.estado === 'DESPACHADO' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
            exp.estado === 'ARQUIVADO' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30';

          return \`
            <tr class="hover:bg-slate-800/80 transition">
              <td class="p-3.5 font-mono font-bold text-sky-400">
                <button onclick="openDetalhesExpediente(\${exp.id})" class="hover:underline flex items-center gap-1">
                  <i class="fa-solid fa-folder-open text-xs"></i> \${exp.numeroProcesso}
                </button>
              </td>
              <td class="p-3.5">
                <div onclick="openDetalhesExpediente(\${exp.id})" class="font-semibold text-slate-200 cursor-pointer hover:text-sky-300 transition">\${exp.titulo}</div>
                <div class="text-[11px] text-slate-400 line-clamp-1">\${exp.assunto}</div>
              </td>
              <td class="p-3.5 text-slate-300">\${exp.remetente}</td>
              <td class="p-3.5 font-medium text-slate-200">\${exp.sectorAtual}</td>
              <td class="p-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold border \${badgePrioridade}">\${exp.prioridade}</span></td>
              <td class="p-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold border \${badgeEstado}">\${exp.estado}</span></td>
              <td class="p-3.5 text-right space-x-1">
                <button onclick="openDetalhesExpediente(\${exp.id})" title="Ver Histórico & Timeline" class="bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white p-1.5 rounded border border-indigo-500/40 text-xs transition">
                  <i class="fa-solid fa-clock-rotate-left"></i> Histórico
                </button>
                <button onclick="openComprovativo(\${exp.id})" title="Imprimir Guia de Entrada" class="bg-slate-700 hover:bg-slate-600 text-slate-200 p-1.5 rounded border border-slate-600 text-xs transition">
                  <i class="fa-solid fa-print"></i> Guia
                </button>
                \${exp.estado !== 'ARQUIVADO' ? \`
                  <button onclick="openTramitar(\${exp.id}, '\${exp.numeroProcesso}')" title="Tramitar" class="bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white p-1.5 rounded border border-sky-500/40 text-xs transition">
                    <i class="fa-solid fa-share"></i> Tramitar
                  </button>
                  <button onclick="openDespacho(\${exp.id}, '\${exp.numeroProcesso}')" title="Emitir Despacho" class="bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white p-1.5 rounded border border-amber-500/40 text-xs transition">
                    <i class="fa-solid fa-stamp"></i> Despacho
                  </button>
                  <button onclick="executeArquivar(\${exp.id})" title="Arquivar" class="bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white p-1.5 rounded border border-emerald-500/40 text-xs transition">
                    <i class="fa-solid fa-box-archive"></i> Arquivar
                  </button>
                \` : '<span class="text-emerald-400 text-[11px] font-medium"><i class="fa-solid fa-circle-check"></i> Arquivado</span>'}
              </td>
            </tr>
          \`;
        }).join('');
      }

      async function openDetalhesExpediente(id) {
        try {
          const res = await fetch('/expedientes/' + id, {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          const exp = data.expediente;
          document.getElementById('detalheProcessoBadge').textContent = exp.numeroProcesso;
          document.getElementById('detalheTitulo').textContent = exp.titulo;
          document.getElementById('detalheRemetente').textContent = exp.remetente;
          document.getElementById('detalhePrioridade').innerHTML = \`<span class="px-2 py-0.5 rounded text-[10px] font-bold \${exp.prioridade === 'URGENTE' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'}">\${exp.prioridade}</span>\`;
          document.getElementById('detalheEstado').innerHTML = \`<span class="px-2 py-0.5 rounded text-[10px] font-bold \${exp.estado === 'DESPACHADO' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : exp.estado === 'ARQUIVADO' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">\${exp.estado}</span>\`;
          document.getElementById('detalheSector').textContent = exp.sectorAtual;
          document.getElementById('detalheAssunto').textContent = exp.assunto;

          // Anexos
          const anexosList = document.getElementById('detalheAnexosList');
          if (exp.anexos) {
            const arr = exp.anexos.split(',').map(a => a.trim()).filter(Boolean);
            anexosList.innerHTML = arr.map(anx => \`
              <button onclick="openAnexo('\${anx}')" class="bg-slate-900 hover:bg-slate-950 border border-slate-700/80 px-2.5 py-1.5 rounded text-sky-400 hover:text-sky-300 flex items-center gap-2 transition">
                <i class="fa-solid fa-file-pdf text-rose-400"></i>
                <span class="font-mono text-[11px]">\${anx}</span>
                <i class="fa-solid fa-eye text-[10px] text-slate-400 ml-1"></i>
              </button>
            \`).join('');
          } else {
            anexosList.innerHTML = '<span class="text-slate-500 italic">Nenhum anexo digital anexado.</span>';
          }

          // Timeline
          const timeline = document.getElementById('detalheTimeline');
          if (!exp.tramitacoes || exp.tramitacoes.length === 0) {
            timeline.innerHTML = \`
              <div class="relative pl-7 text-slate-400">
                <span class="absolute left-1 top-1 w-4 h-4 rounded-full bg-sky-500 border-2 border-slate-800"></span>
                <div class="font-bold text-slate-200">Expediente Registado</div>
                <div class="text-[11px] text-slate-400">Registado por \${exp.autorNome} no sector \${exp.sectorAtual} em \${new Date(exp.criadoEm).toLocaleString('pt')}</div>
              </div>
            \`;
          } else {
            let html = \`
              <div class="relative pl-7 text-slate-400 pb-2">
                <span class="absolute left-1 top-1 w-4 h-4 rounded-full bg-sky-500 border-2 border-slate-800"></span>
                <div class="font-bold text-slate-200">Entrada e Registo Inicial</div>
                <div class="text-[11px] text-slate-400">Entrada na Recepção por \${exp.autorNome} em \${new Date(exp.criadoEm).toLocaleString('pt')}</div>
              </div>
            \`;

            html += exp.tramitacoes.map((t) => \`
              <div class="relative pl-7 text-slate-300 space-y-1">
                <span class="absolute left-1 top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-800"></span>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-300">\${t.origemSector} &rarr; \${t.destinoSector}</span>
                  <span class="font-mono text-[10px] text-slate-400">\${new Date(t.dataEnvio).toLocaleString('pt')}</span>
                </div>
                <div class="text-[11px] text-slate-400">Enviado por: <span class="text-slate-200 font-semibold">\${t.remetenteNome}</span></div>
                <div class="bg-slate-900/60 p-2.5 rounded border border-slate-700/60 text-slate-300 text-[11px] italic">
                  "\${t.despacho || 'Sem observações prestadas.'}"
                </div>
              </div>
            \`).join('');

            timeline.innerHTML = html;
          }

          document.getElementById('detalheBtnImprimirGuia').onclick = () => openComprovativoFromObj(exp);
          document.getElementById('modalDetalhesExpediente').classList.remove('hidden');
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function openComprovativo(id) {
        try {
          const res = await fetch('/expedientes/' + id, {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);
          openComprovativoFromObj(data.expediente);
        } catch (err) {
          showToast(err.message, true);
        }
      }

      function openComprovativoFromObj(exp) {
        document.getElementById('compNumeroProcesso').textContent = exp.numeroProcesso;
        document.getElementById('compData').textContent = new Date(exp.criadoEm).toLocaleString('pt');
        document.getElementById('compRemetente').textContent = exp.remetente;
        document.getElementById('compSector').textContent = exp.sectorAtual;
        document.getElementById('compTitulo').textContent = exp.titulo;
        document.getElementById('compAssunto').textContent = exp.assunto;
        document.getElementById('compRecepcionista').textContent = exp.autorNome || 'Serviços de Recepção';
        document.getElementById('modalComprovativo').classList.remove('hidden');
      }

      function openAnexo(filename) {
        document.getElementById('anexoNome').textContent = filename;
        document.getElementById('modalVisualizadorAnexo').classList.remove('hidden');
      }

      async function loadUtilizadores() {
        try {
          const res = await fetch('/auth/users', {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          const users = data.users || [];
          renderUsersTable(users);

          // Update statistics
          const elTotal = document.getElementById('userStatTotal'); if (elTotal) elTotal.textContent = users.length;
          const elRecep = document.getElementById('userStatRecep'); if (elRecep) elRecep.textContent = users.filter(u => u.role === 'Recepcionista').length;
          const elChefes = document.getElementById('userStatChefes'); if (elChefes) elChefes.textContent = users.filter(u => u.role === 'Chefe de Sector' || u.role === 'Director').length;
          const elAdmins = document.getElementById('userStatAdmins'); if (elAdmins) elAdmins.textContent = users.filter(u => u.role === 'Administrador').length;
        } catch (err) {
          showToast('Erro ao carregar utilizadores: ' + err.message, true);
        }
      }

      function renderUsersTable(users) {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;
        if (!users || users.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">Nenhum utilizador registado.</td></tr>';
          return;
        }

        tbody.innerHTML = users.map(u => {
          return \`
            <tr class="hover:bg-slate-800/80 transition">
              <td class="p-3.5">
                <div class="font-bold text-slate-100 flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-sky-600/30 border border-sky-500/40 text-sky-300 flex items-center justify-center font-bold text-[10px]">
                    \${u.nome.charAt(0)}
                  </div>
                  \${u.nome}
                </div>
                <div class="text-[10px] text-slate-400 font-mono">ID: #\${u.id}</div>
              </td>
              <td class="p-3.5 font-mono text-slate-300">\${u.email}</td>
              <td class="p-3.5 text-slate-300">\${u.sector || 'Geral'}</td>
              <td class="p-3.5">
                <select onchange="handleUserRoleChange(\${u.id}, this.value)" class="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-sky-400 font-semibold focus:outline-none">
                  <option value="Recepcionista" \${u.role === 'Recepcionista' ? 'selected' : ''}>Recepcionista</option>
                  <option value="Chefe de Sector" \${u.role === 'Chefe de Sector' ? 'selected' : ''}>Chefe de Sector</option>
                  <option value="Director" \${u.role === 'Director' ? 'selected' : ''}>Director</option>
                  <option value="Arquivista" \${u.role === 'Arquivista' ? 'selected' : ''}>Arquivista</option>
                  <option value="Administrador" \${u.role === 'Administrador' ? 'selected' : ''}>Administrador</option>
                </select>
              </td>
              <td class="p-3.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold \${u.ativo ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}">
                  \${u.ativo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td class="p-3.5 text-right space-x-1">
                <button onclick="handleToggleUserStatus(\${u.id})" class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded text-xs transition">
                  <i class="fa-solid \${u.ativo ? 'fa-user-slash text-rose-400' : 'fa-user-check text-emerald-400'}"></i> \${u.ativo ? 'Desactivar' : 'Activar'}
                </button>
                <button onclick="openEditUserModal(\${u.id}, '\${u.nome}', '\${u.email}', '\${u.role}', '\${u.sector || ''}')" class="bg-sky-700 hover:bg-sky-600 text-white px-2.5 py-1 rounded text-xs transition">
                  <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button onclick="handleDeleteUser(\${u.id}, '\${u.nome}')" class="bg-rose-700 hover:bg-rose-600 text-white px-2.5 py-1 rounded text-xs transition">
                  <i class="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          \`;
        }).join('');
      }

      async function handleExecuteCriarUtilizador(e) {
        e.preventDefault();
        const nome = document.getElementById('novoUserNome').value;
        const email = document.getElementById('novoUserEmail').value;
        const senha = document.getElementById('novoUserSenha').value;
        const role = document.getElementById('novoUserRole').value;
        const sector = document.getElementById('novoUserSector').value;

        try {
          const res = await fetch('/auth/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ nome, email, senha, role, sector })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          closeModal('modalNovoUtilizador');
          showToast(\`Utilizador \${nome} registado com sucesso!\`);
          loadUtilizadores();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function handleUserRoleChange(userId, newRole) {
        try {
          const res = await fetch(\`/auth/users/\${userId}/role\`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ role: newRole })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          showToast('Perfil de utilizador atualizado!');
          loadUtilizadores();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function handleToggleUserStatus(userId) {
        try {
          const res = await fetch(\`/auth/users/\${userId}/status\`, {
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + currentToken
            }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          showToast('Estado do utilizador alterado!');
          loadUtilizadores();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      function openEditUserModal(id, nome, email, role, sector) {
        document.getElementById('editUserId').value = id;
        document.getElementById('editUserNome').value = nome;
        document.getElementById('editUserEmail').value = email;
        document.getElementById('editUserSector').value = sector;
        const sel = document.getElementById('editUserRole');
        for (let i = 0; i < sel.options.length; i++) {
          sel.options[i].selected = sel.options[i].value === role;
        }
        openModal('modalEditarUtilizador');
      }

      async function handleSaveEditUser(e) {
        e.preventDefault();
        const id = document.getElementById('editUserId').value;
        const role = document.getElementById('editUserRole').value;
        const nome = document.getElementById('editUserNome').value;
        const email = document.getElementById('editUserEmail').value;
        const sector = document.getElementById('editUserSector').value;
        try {
          const resRole = await fetch(\`/auth/users/\${id}/role\`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentToken },
            body: JSON.stringify({ role, nome, email, sector })
          });
          const data = await resRole.json();
          if (!resRole.ok) throw new Error(data.erro);
          closeModal('modalEditarUtilizador');
          showToast('Utilizador actualizado com sucesso!');
          loadUtilizadores();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function handleDeleteUser(userId, nome) {
        if (!confirm(\`Tem a certeza que deseja eliminar o utilizador "\${nome}"? Esta acção é irreversível.\`)) return;
        try {
          const res = await fetch(\`/auth/users/\${userId}\`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);
          showToast(\`Utilizador "\${nome}" eliminado com sucesso!\`);
          loadUtilizadores();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function handleRegistrarExpediente(e) {
        e.preventDefault();
        const titulo = document.getElementById('expTitulo').value;
        const remetente = document.getElementById('expRemetente').value;
        const prioridade = document.getElementById('expPrioridade').value;
        const sectorDestino = document.getElementById('expSectorDestino').value;
        const assunto = document.getElementById('expAssunto').value;
        const anexos = document.getElementById('expAnexos').value;

        try {
          const res = await fetch('/expedientes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ titulo, remetente, prioridade, sectorDestino, assunto, anexos })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          showToast('Expediente registado com sucesso!');
          document.getElementById('formNovoExpediente').reset();
          switchTab('expedientes');
        } catch (err) {
          showToast(err.message, true);
        }
      }

      function openTramitar(id, num) {
        document.getElementById('tramitarExpId').value = id;
        document.getElementById('modalTramitarNum').textContent = num;
        document.getElementById('modalTramitar').classList.remove('hidden');
      }

      function openDespacho(id, num) {
        document.getElementById('despachoExpId').value = id;
        document.getElementById('modalDespachoNum').textContent = num;
        document.getElementById('modalDespacho').classList.remove('hidden');
      }

      function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
      }

      function togglePasswordVisibility(inputId, btnId, visible) {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        if (!input) return;

        if (visible) {
          input.type = 'text';
          if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-lock-open text-sky-400 text-sm"></i>';
            btn.title = 'A visualizar palavra-passe';
            btn.classList.add('bg-sky-500/10');
          }
        } else {
          input.type = 'password';
          if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-lock text-slate-400 text-sm"></i>';
            btn.title = 'Passe o rato para ver a palavra-passe';
            btn.classList.remove('bg-sky-500/10');
          }
        }
      }

      function validateDynamicEmailInput(input) {
        if (!input) return;
        const val = input.value.trim();
        const checkEl = document.getElementById('emailCheck_' + input.id);
        const iconEl = document.getElementById('emailIcon_' + input.id);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(val)) {
          if (checkEl) checkEl.classList.remove('hidden');
          if (iconEl) iconEl.className = 'fa-solid fa-envelope absolute left-3 top-2.5 text-emerald-400 transition';
          input.classList.add('border-emerald-500/60');
          input.classList.remove('border-slate-700');
        } else {
          if (checkEl) checkEl.classList.add('hidden');
          if (iconEl) iconEl.className = 'fa-solid fa-envelope absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition';
          input.classList.remove('border-emerald-500/60');
          input.classList.add('border-slate-700');
        }
      }

      function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('hidden');
          const form = modal.querySelector('form');
          if (form) {
            form.reset();
            const emailChecks = form.querySelectorAll('[id^="emailCheck_"]');
            emailChecks.forEach(el => el.classList.add('hidden'));
            const emailIcons = form.querySelectorAll('[id^="emailIcon_"]');
            emailIcons.forEach(el => el.className = 'fa-solid fa-envelope absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition');
          }
        }
      }

      function openAuthModal(initialTab = 'login') {
        const modal = document.getElementById('modalAuth');
        if (modal) modal.classList.remove('hidden');
        switchAuthSubTab(initialTab);
      }

      function switchAuthSubTab(tab) {
        const btnLogin = document.getElementById('authSubTabLogin');
        const btnRecover = document.getElementById('authSubTabRecover');

        const viewLogin = document.getElementById('authViewLogin');
        const viewRecover = document.getElementById('authViewRecover');

        [btnLogin, btnRecover].forEach(b => {
          if (b) b.className = 'py-2 rounded-lg text-slate-400 hover:text-slate-200 transition flex items-center justify-center gap-1.5';
        });

        [viewLogin, viewRecover].forEach(v => {
          if (v) v.classList.add('hidden');
        });

        if (tab === 'login') {
          if (btnLogin) btnLogin.className = 'py-2 rounded-lg bg-sky-600 text-white shadow transition flex items-center justify-center gap-1.5';
          if (viewLogin) viewLogin.classList.remove('hidden');
        } else if (tab === 'recover') {
          if (btnRecover) btnRecover.className = 'py-2 rounded-lg bg-amber-600 text-white shadow transition flex items-center justify-center gap-1.5';
          if (viewRecover) viewRecover.classList.remove('hidden');
        }
      }

      async function handleExecuteAuthLogin(e) {
        e.preventDefault();
        const email = document.getElementById('authLoginEmail').value;
        const senha = document.getElementById('authLoginSenha').value;

        try {
          const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          setSession(data.token, data.user);
        } catch (err) {
          showToast('Falha no login: ' + err.message, true);
        }
      }

      async function handleExecuteAuthRecover(e) {
        e.preventDefault();
        const email = document.getElementById('authRecoverEmail').value;
        const novaSenha = document.getElementById('authRecoverNovaSenha').value;

        try {
          const res = await fetch('/auth/recover', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, novaSenha })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          showToast('Palavra-passe redefinida com sucesso! Pode agora fazer login.');
          switchAuthSubTab('login');
          document.getElementById('authLoginEmail').value = email;
          document.getElementById('authLoginSenha').value = novaSenha;
        } catch (err) {
          showToast('Erro ao redefinir palavra-passe: ' + err.message, true);
        }
      }

      async function handleExecuteTramitar(e) {
        e.preventDefault();
        const id = document.getElementById('tramitarExpId').value;
        const destinoSector = document.getElementById('tramitarDestino').value;
        const despachoOuParecer = document.getElementById('tramitarParecer').value;

        try {
          const res = await fetch(\`/expedientes/\${id}/tramitar\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ destinoSector, despachoOuParecer })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          closeModal('modalTramitar');
          showToast('Expediente tramitado com sucesso!');
          loadExpedientes();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function handleExecuteDespacho(e) {
        e.preventDefault();
        const id = document.getElementById('despachoExpId').value;
        const decisao = document.getElementById('despachoDecisao').value;
        const despachoTexto = document.getElementById('despachoTexto').value;

        try {
          const res = await fetch(\`/expedientes/\${id}/despachar\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ decisao, despachoTexto })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          closeModal('modalDespacho');
          showToast('Despacho assinado e publicado!');
          loadExpedientes();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function executeArquivar(id) {
        if (!confirm('Deseja arquivar definitivamente este expediente?')) return;
        try {
          const res = await fetch(\`/expedientes/\${id}/arquivar\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify({ observacoes: 'Processo arquivado após conclusão de trâmites.' })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          showToast('Expediente remetido ao arquivo!');
          loadExpedientes();
        } catch (err) {
          showToast(err.message, true);
        }
      }

      async function loadAuditoria() {
        try {
          const res = await fetch('/auditoria', {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          const tbody = document.getElementById('auditTableBody');
          if (!tbody) return;
          if (!data.logs || data.logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">Sem registos de auditoria.</td></tr>';
            return;
          }

          tbody.innerHTML = data.logs.map(log => \`
            <tr class="hover:bg-slate-800/80 transition">
              <td class="p-3 text-slate-400 font-mono text-[11px]">\${new Date(log.timestamp).toLocaleString('pt')}</td>
              <td class="p-3 font-semibold text-slate-200">\${log.userNome}</td>
              <td class="p-3"><span class="bg-slate-700 text-sky-300 px-2 py-0.5 rounded text-[10px]">\${log.userRole}</span></td>
              <td class="p-3 font-mono font-bold text-amber-400 text-[11px]">\${log.acao}</td>
              <td class="p-3 text-slate-300">\${log.entidade}</td>
              <td class="p-3 text-slate-300">\${log.detalhes}</td>
            </tr>
          \`).join('');
        } catch (err) {
          showToast('Acesso negado ou erro ao carregar auditoria: ' + err.message, true);
          const tbody = document.getElementById('auditTableBody');
          if (tbody) tbody.innerHTML = \`<tr><td colspan="6" class="p-6 text-center text-rose-400"><i class="fa-solid fa-lock mr-2"></i> \${err.message}</td></tr>\`;
        }
      }

      let chartEstadosInstance = null;
      let chartSectoresInstance = null;
      let chartPrioridadeInstance = null;
      let cachedGlobalStatsData = null;
      let cachedExpedientesList = [];

      function switchRoleDashboard(roleName) {
        if (!roleName) roleName = currentUser ? currentUser.role : 'Administrador';
        currentActiveRoleDashboard = roleName;

        const roleMap = {
          'Administrador': 'Administrador',
          'Director': 'Director',
          'Chefe de Sector': 'Chefe_de_Sector',
          'Recepcionista': 'Recepcionista',
          'Arquivista': 'Arquivista'
        };

        const targetKey = roleMap[roleName] || 'Administrador';

        ['Administrador', 'Director', 'Chefe_de_Sector', 'Recepcionista', 'Arquivista'].forEach(k => {
          const container = document.getElementById('dashContainer_' + k);
          if (container) {
            if (k === targetKey) container.classList.remove('hidden');
            else container.classList.add('hidden');
          }
        });

        // Update active badge
        const badge = document.getElementById('activeRoleDashBadge');
        if (badge) {
          badge.innerHTML = \`<i class="fa-solid fa-user-shield mr-1"></i> Visão: \${roleName}\`;
        }

        // Highlight active switcher button
        const btnKeys = {
          'Administrador': 'btnDashRole_Administrador',
          'Director': 'btnDashRole_Director',
          'Chefe de Sector': 'btnDashRole_Chefe',
          'Recepcionista': 'btnDashRole_Recepcionista',
          'Arquivista': 'btnDashRole_Arquivista'
        };

        Object.keys(btnKeys).forEach(r => {
          const btn = document.getElementById(btnKeys[r]);
          if (btn) {
            if (r === roleName) {
              btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 text-white transition flex items-center gap-1.5 shadow ring-2 ring-sky-400/40';
            } else {
              btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition flex items-center gap-1.5';
            }
          }
        });

        renderRoleSpecificDashboardData(roleName);
      }

      function renderRoleSpecificDashboardData(roleName) {
        if (!cachedGlobalStatsData) return;
        const kpis = cachedGlobalStatsData.kpis || {};
        const porSector = cachedGlobalStatsData.porSector || {};
        const util = cachedGlobalStatsData.utilizadores || {};
        const exps = cachedExpedientesList || [];

        // 1. Administrador
        if (roleName === 'Administrador') {
          const el1 = document.getElementById('adminStatTotal'); if (el1) el1.textContent = kpis.totalExpedientes || 0;
          const el2 = document.getElementById('adminStatUtilizadores'); if (el2) el2.textContent = util.activos || 0;
          const el3 = document.getElementById('adminStatResolucao'); if (el3) el3.textContent = (kpis.taxaResolucao || 0) + '%';
          const el4 = document.getElementById('adminStatAuditCount'); if (el4) el4.textContent = kpis.totalTramitacoes || 0;

          if (typeof Chart !== 'undefined') {
            const ctx1 = document.getElementById('chartAdminSectoresCanvas');
            if (ctx1) {
              if (chartSectoresInstance) chartSectoresInstance.destroy();
              chartSectoresInstance = new Chart(ctx1, {
                type: 'bar',
                data: {
                  labels: Object.keys(porSector).length ? Object.keys(porSector) : ['Geral'],
                  datasets: [{ label: 'Processos', data: Object.values(porSector).length ? Object.values(porSector) : [0], backgroundColor: '#38bdf8', borderRadius: 6 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#94a3b8', font: { size: 9 } } }, y: { ticks: { color: '#94a3b8', font: { size: 9 } }, grid: { color: '#334155' } } } }
              });
            }

            const ctx2 = document.getElementById('chartAdminEstadosCanvas');
            if (ctx2) {
              if (chartEstadosInstance) chartEstadosInstance.destroy();
              const estData = kpis.porEstado || {};
              chartEstadosInstance = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                  labels: ['Registado', 'Em Tramitação', 'Despachado', 'Arquivado', 'Rejeitado'],
                  datasets: [{
                    data: [estData.REGISTADO || 0, estData.EM_TRAMITACAO || 0, estData.DESPACHADO || 0, estData.ARQUIVADO || 0, estData.REJEITADO || 0],
                    backgroundColor: ['#38bdf8', '#fbbf24', '#818cf8', '#34d399', '#f87171'],
                    borderWidth: 2,
                    borderColor: '#1e293b'
                  }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } } } }
              });
            }
          }
        }

        // 2. Director
        if (roleName === 'Director') {
          const pendentes = exps.filter(e => e.estado === 'EM_TRAMITACAO' || e.prioridade === 'URGENTE');
          const e1 = document.getElementById('directorStatPendentes'); if (e1) e1.textContent = pendentes.length;
          const e2 = document.getElementById('directorStatTaxa'); if (e2) e2.textContent = (kpis.taxaResolucao || 0) + '%';
          const e3 = document.getElementById('directorStatTempo'); if (e3) e3.textContent = kpis.mediaTramitacoesPorProcesso || '1.5';
          const e4 = document.getElementById('directorStatUrgentes'); if (e4) e4.textContent = kpis.urgentesPendentes || 0;

          const table = document.getElementById('directorFilaDespachosTable');
          if (table) {
            if (pendentes.length === 0) {
              table.innerHTML = '<div class="text-slate-500 text-center py-6">Sem processos urgentes a aguardar despacho superior.</div>';
            } else {
              table.innerHTML = pendentes.map(e => '<div class="bg-slate-900/80 p-3 rounded-lg border border-slate-700/70 flex items-center justify-between gap-3 hover:border-amber-500/50 transition">' +
                '<div class="space-y-0.5">' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="font-mono font-bold text-amber-400 text-xs">' + e.numeroProcesso + '</span>' +
                    '<span class="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-1.5 py-0.2 rounded uppercase">' + e.prioridade + '</span>' +
                    '<span class="text-slate-400 text-[10px]">• Sector: ' + e.sectorAtual + '</span>' +
                  '</div>' +
                  '<div class="text-slate-200 font-semibold text-xs">' + e.titulo + '</div>' +
                '</div>' +
                '<button onclick="switchTab(&quot;expedientes&quot;); setTimeout(function(){ openDespacho(' + e.id + '); }, 100)" class="bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold px-3 py-1.5 rounded transition shrink-0 flex items-center gap-1 shadow">' +
                  '<i class="fa-solid fa-stamp"></i> Despachar' +
                '</button>' +
              '</div>').join('');
            }
          }
        }

        // 3. Chefe de Sector
        if (roleName === 'Chefe de Sector') {
          const mySector = (currentUser && currentUser.sector) ? currentUser.sector : 'Geral';
          const sectorExps = exps.filter(e => e.sectorAtual === mySector || !currentUser.sector);
          const pendentesSector = sectorExps.filter(e => e.estado === 'EM_TRAMITACAO' || e.estado === 'REGISTADO');
          const urgentesSector = sectorExps.filter(e => e.prioridade === 'URGENTE');

          const c1 = document.getElementById('chefeStatSectorTotal'); if (c1) c1.textContent = sectorExps.length;
          const c2 = document.getElementById('chefeStatSectorNome'); if (c2) c2.textContent = 'Sector: ' + mySector;
          const c3 = document.getElementById('chefeStatPendentesParecer'); if (c3) c3.textContent = pendentesSector.length;
          const c4 = document.getElementById('chefeStatUrgentes'); if (c4) c4.textContent = urgentesSector.length;
          const c5 = document.getElementById('chefeStatTramitados'); if (c5) c5.textContent = kpis.totalTramitacoes || sectorExps.length;

          const table = document.getElementById('chefeExpedientesSectorTable');
          if (table) {
            if (sectorExps.length === 0) {
              table.innerHTML = '<div class="text-slate-500 text-center py-6">Sem expedientes alocados ao sector (' + mySector + ').</div>';
            } else {
              table.innerHTML = sectorExps.map(e => '<div class="bg-slate-900/80 p-3 rounded-lg border border-slate-700/70 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-sky-500/50 transition">' +
                '<div class="space-y-0.5">' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="font-mono font-bold text-sky-400 text-xs">' + e.numeroProcesso + '</span>' +
                    '<span class="bg-slate-700 text-slate-200 text-[9px] px-1.5 py-0.2 rounded font-mono">' + e.estado + '</span>' +
                    '<span class="text-slate-400 text-[10px]">' + e.tipo + '</span>' +
                  '</div>' +
                  '<div class="text-slate-200 font-semibold text-xs">' + e.titulo + '</div>' +
                '</div>' +
                '<div class="flex items-center gap-1.5 shrink-0">' +
                  '<button onclick="switchTab(&quot;expedientes&quot;); setTimeout(function(){ openTramitar(' + e.id + '); }, 100)" class="bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition flex items-center gap-1">' +
                    '<i class="fa-solid fa-share"></i> Tramitar' +
                  '</button>' +
                  '<button onclick="switchTab(&quot;expedientes&quot;); setTimeout(function(){ openDespacho(' + e.id + '); }, 100)" class="bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition flex items-center gap-1">' +
                    '<i class="fa-solid fa-comment-dots"></i> Parecer' +
                  '</button>' +
                '</div>' +
              '</div>').join('');
            }
          }
        }

        // 4. Recepcionista
        if (roleName === 'Recepcionista') {
          const hoje = new Date().toISOString().split('T')[0];
          const registadosHoje = exps.filter(e => e.createdAt && e.createdAt.startsWith(hoje));
          const totalRegistos = registadosHoje.length > 0 ? registadosHoje.length : exps.length;

          const r1 = document.getElementById('recepStatHoje'); if (r1) r1.textContent = totalRegistos;
          const r2 = document.getElementById('recepStatGuias'); if (r2) r2.textContent = totalRegistos;
          const r3 = document.getElementById('recepStatEncaminhados'); if (r3) r3.textContent = exps.filter(e => e.estado === 'EM_TRAMITACAO').length;

          const table = document.getElementById('recepUltimosRegistosList');
          if (table) {
            const listToShow = registadosHoje.length > 0 ? registadosHoje : exps.slice(0, 5);
            if (listToShow.length === 0) {
              table.innerHTML = '<div class="text-slate-500 text-center py-6">Nenhum registo efetuado hoje na recepção.</div>';
            } else {
              table.innerHTML = listToShow.map(e => '<div class="bg-slate-900/80 p-3 rounded-lg border border-slate-700/70 flex items-center justify-between gap-3 hover:border-emerald-500/50 transition">' +
                '<div>' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="font-mono font-bold text-emerald-400 text-xs">' + e.numeroProcesso + '</span>' +
                    '<span class="text-slate-400 text-[10px]">' + new Date(e.createdAt || Date.now()).toLocaleTimeString('pt', {hour: '2-digit', minute:'2-digit'}) + '</span>' +
                  '</div>' +
                  '<div class="text-slate-200 font-semibold text-xs">' + e.titulo + '</div>' +
                  '<div class="text-slate-400 text-[10px]">Utente/Requerente: ' + (e.requerente || 'Externo') + '</div>' +
                '</div>' +
                '<button onclick="openComprovativo(' + e.id + ')" class="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2.5 py-1.5 rounded transition shrink-0 flex items-center gap-1 border border-slate-600">' +
                  '<i class="fa-solid fa-print text-sky-400"></i> Imprimir Guia' +
                '</button>' +
              '</div>').join('');
            }
          }
        }

        // 5. Arquivista
        if (roleName === 'Arquivista') {
          const arquivados = exps.filter(e => e.estado === 'ARQUIVADO');
          const despachadosAguardando = exps.filter(e => e.estado === 'DESPACHADO');

          const a1 = document.getElementById('arqStatArquivados'); if (a1) a1.textContent = arquivados.length;
          const a2 = document.getElementById('arqStatAguardando'); if (a2) a2.textContent = despachadosAguardando.length;
          const a3 = document.getElementById('arqStatAnexos'); if (a3) a3.textContent = exps.reduce((acc, curr) => acc + (curr.anexos ? curr.anexos.length : 1), 0);

          const table = document.getElementById('arqFilaAguardandoTable');
          if (table) {
            if (despachadosAguardando.length === 0) {
              table.innerHTML = '<div class="text-slate-500 text-center py-6">Sem processos despachados pendentes de arquivamento definitivo no acervo.</div>';
            } else {
              table.innerHTML = despachadosAguardando.map(e => '<div class="bg-slate-900/80 p-3 rounded-lg border border-slate-700/70 flex items-center justify-between gap-3 hover:border-purple-500/50 transition">' +
                '<div>' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="font-mono font-bold text-purple-400 text-xs">' + e.numeroProcesso + '</span>' +
                    '<span class="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-mono">DESPACHADO</span>' +
                  '</div>' +
                  '<div class="text-slate-200 font-semibold text-xs">' + e.titulo + '</div>' +
                '</div>' +
                '<button onclick="executeArquivar(' + e.id + ')" class="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold px-3 py-1.5 rounded transition shrink-0 flex items-center gap-1 shadow">' +
                  '<i class="fa-solid fa-box-archive"></i> Arquivar' +
                '</button>' +
              '</div>').join('');
            }
          }
        }
      }

      function toggleNotificationsMenu(e) {
        if (e) e.stopPropagation();
        const drop = document.getElementById('notificationsDropdown');
        if (drop) {
          drop.classList.toggle('hidden');
          if (!drop.classList.contains('hidden')) {
            loadNotifications();
          }
        }
      }

      document.addEventListener('click', (e) => {
        const drop = document.getElementById('notificationsDropdown');
        const btn = document.getElementById('btnNotificacoes');
        if (drop && !drop.classList.contains('hidden')) {
          if (!drop.contains(e.target) && (!btn || !btn.contains(e.target))) {
            drop.classList.add('hidden');
          }
        }
      });

      async function loadNotifications() {
        try {
          const container = document.getElementById('notifListContainer');
          if (!container) return;

          const readIds = JSON.parse(localStorage.getItem('sige_read_notifs') || '[]');

          const res = await fetch('/expedientes', {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const exps = await res.json();

          const notifs = [];

          if (currentUser) {
            notifs.push({
              id: 'notif_welcome_' + currentUser.id,
              titulo: 'Sessão activa (' + currentUser.role + ')',
              desc: 'Bem-vindo ao SIGE, ' + currentUser.nome + '. Acesso concedido como ' + currentUser.role + '.',
              data: new Date().toLocaleTimeString('pt', {hour:'2-digit', minute:'2-digit'}),
              tipo: 'sistema',
              icon: 'fa-solid fa-shield-halved text-indigo-400'
            });
          }

          if (Array.isArray(exps)) {
            exps.forEach(e => {
              if (e.prioridade === 'URGENTE' && e.estado !== 'ARQUIVADO') {
                notifs.push({
                  id: 'notif_urg_' + e.id,
                  expId: e.id,
                  titulo: 'Urgência: ' + e.numeroProcesso,
                  desc: 'Expediente "' + e.titulo + '" requer atenção prioritária (' + e.sectorAtual + ').',
                  data: new Date(e.createdAt || Date.now()).toLocaleDateString('pt'),
                  tipo: 'urgente',
                  icon: 'fa-solid fa-triangle-exclamation text-rose-400'
                });
              } else if (currentUser && e.sectorAtual === currentUser.sector && e.estado === 'EM_TRAMITACAO') {
                notifs.push({
                  id: 'notif_sec_' + e.id,
                  expId: e.id,
                  titulo: 'Novo no Sector: ' + e.numeroProcesso,
                  desc: 'Aguardando acção do sector ' + e.sectorAtual + '.',
                  data: new Date(e.updatedAt || Date.now()).toLocaleDateString('pt'),
                  tipo: 'sector',
                  icon: 'fa-solid fa-share text-sky-400'
                });
              }
            });
          }

          const unread = notifs.filter(n => !readIds.includes(n.id));

          const badge = document.getElementById('notifBadge');
          if (badge) {
            badge.textContent = unread.length;
            if (unread.length > 0) badge.classList.remove('hidden');
            else badge.classList.add('hidden');
          }

          const headerCount = document.getElementById('notifUnreadHeaderCount');
          if (headerCount) {
            headerCount.textContent = unread.length + ' não lidas';
          }

          if (notifs.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-slate-500 italic">Sem notificações recentes.</div>';
            return;
          }

          container.innerHTML = notifs.map(n => {
            const isRead = readIds.includes(n.id);
            return '<div onclick="handleClickNotification(&quot;' + n.id + '&quot;, ' + (n.expId || 'null') + ')" class="p-3 hover:bg-slate-800/80 transition cursor-pointer flex items-start gap-2.5 ' + (isRead ? 'opacity-60' : 'bg-slate-800/30') + '">' +
              '<div class="mt-0.5 shrink-0 text-sm"><i class="' + n.icon + '"></i></div>' +
              '<div class="flex-1 min-w-0 space-y-0.5">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="font-bold text-slate-200 text-xs truncate">' + n.titulo + '</span>' +
                  '<span class="text-[9px] text-slate-400 font-mono">' + n.data + '</span>' +
                '</div>' +
                '<p class="text-[11px] text-slate-300 line-clamp-2 leading-tight">' + n.desc + '</p>' +
              '</div>' +
              (!isRead ? '<span class="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"></span>' : '') +
            '</div>';
          }).join('');

        } catch (err) {
          console.error('Erro ao carregar notificações:', err);
        }
      }

      function handleClickNotification(notifId, expId) {
        markNotificationAsRead(notifId);
        const drop = document.getElementById('notificationsDropdown');
        if (drop) drop.classList.add('hidden');

        if (expId) {
          switchTab('expedientes');
          setTimeout(() => {
            openDetalhesExpediente(expId);
          }, 150);
        }
      }

      let tempProfileFotoBase64 = null;

      function openProfileModal() {
        if (!currentUser) {
          showToast('Necessita estar autenticado para aceder ao perfil.', true);
          openAuthModal('login');
          return;
        }

        tempProfileFotoBase64 = currentUser.foto || null;

        const elNome = document.getElementById('profileNome');
        const elEmail = document.getElementById('profileEmail');
        const elRoleDis = document.getElementById('profileRoleDisabled');
        const elHeaderName = document.getElementById('profileHeaderName');
        const elHeaderEmail = document.getElementById('profileHeaderEmail');
        const elBadge = document.getElementById('profileCurrentRoleBadge');
        const elPreview = document.getElementById('profileFotoPreview');

        if (elNome) elNome.value = currentUser.nome || '';
        if (elEmail) elEmail.value = currentUser.email || '';
        if (elRoleDis) elRoleDis.value = currentUser.role || 'Utilizador';
        if (elHeaderName) elHeaderName.textContent = currentUser.nome || '';
        if (elHeaderEmail) elHeaderEmail.textContent = currentUser.email || '';
        if (elBadge) elBadge.textContent = currentUser.role || '';

        // Reset password fields
        const elSenhaAtual = document.getElementById('profileSenhaAtual');
        const elNovaSenha = document.getElementById('profileNovaSenha');
        const elNovaSenhaConfirm = document.getElementById('profileNovaSenhaConfirm');
        if (elSenhaAtual) elSenhaAtual.value = '';
        if (elNovaSenha) elNovaSenha.value = '';
        if (elNovaSenhaConfirm) elNovaSenhaConfirm.value = '';

        if (elPreview) {
          if (currentUser.foto) {
            elPreview.innerHTML = '<img src="' + currentUser.foto + '" class="w-full h-full object-cover rounded-full" alt="Foto">';
          } else {
            elPreview.innerHTML = '<i class="fa-solid fa-user text-2xl text-sky-400"></i>';
          }
        }

        openModal('modalPerfilDefinicoes');
      }

      function handleProfileFotoPreview(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
          showToast('A imagem seleccionada é muito grande (máximo 5MB).', true);
          return;
        }

        const reader = new FileReader();
        reader.onload = function(evt) {
          tempProfileFotoBase64 = evt.target.result;
          const elPreview = document.getElementById('profileFotoPreview');
          if (elPreview) {
            elPreview.innerHTML = '<img src="' + tempProfileFotoBase64 + '" class="w-full h-full object-cover rounded-full" alt="Foto">';
          }
        };
        reader.readAsDataURL(file);
      }

      async function handleSaveProfile(e) {
        e.preventDefault();
        const nome = document.getElementById('profileNome')?.value;
        const email = document.getElementById('profileEmail')?.value;
        const senhaAtual = document.getElementById('profileSenhaAtual')?.value;
        const novaSenha = document.getElementById('profileNovaSenha')?.value;
        const novaSenhaConfirm = document.getElementById('profileNovaSenhaConfirm')?.value;

        if (novaSenha || novaSenhaConfirm) {
          if (!senhaAtual) {
            showToast('Por favor introduza a sua palavra-passe actual para alterar a senha.', true);
            return;
          }
          if (novaSenha !== novaSenhaConfirm) {
            showToast('A nova palavra-passe e a confirmação não coincidem.', true);
            return;
          }
          if (novaSenha.length < 6) {
            showToast('A nova palavra-passe deve ter pelo menos 6 caracteres.', true);
            return;
          }
        }

        try {
          const payload = {
            nome,
            email,
            foto: tempProfileFotoBase64,
            senhaAtual: senhaAtual || undefined,
            novaSenha: novaSenha || undefined
          };

          const res = await fetch('/auth/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentToken
            },
            body: JSON.stringify(payload)
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.erro || 'Erro ao guardar definições');

          if (data.user) {
            currentUser.nome = data.user.nome;
            currentUser.email = data.user.email;
            if (data.user.foto) currentUser.foto = data.user.foto;
            localStorage.setItem('sige_user', JSON.stringify(currentUser));
          }

          updateUserBadge();
          applyRolePermissions();
          closeModal('modalPerfilDefinicoes');
          showToast('Definições e perfil actualizados com sucesso!');

        } catch (err) {
          showToast('Erro ao guardar perfil: ' + err.message, true);
        }
      }

      // Aliases for global backwards compatibility
      window.openProfileModal = openProfileModal;
      window.handleProfileFotoPreview = handleProfileFotoPreview;
      window.handleSaveProfile = handleSaveProfile;
      window.openDespachoModal = function(id) { openDespacho(id); };
      window.openTramitarModal = function(id) { openTramitar(id); };
      window.executarArquivamentoDirecto = function(id) { executeArquivar(id); };
      window.openExpedienteDetailModal = function(id) { openDetalhesExpediente(id); };
      window.printReceipt = function(num, tit, req, sec) { openComprovativoFromObj({ numeroProcesso: num || 'EXP-000', titulo: tit || '', remetente: req || 'Utente', sectorAtual: sec || 'Geral', criadoEm: new Date(), assunto: tit || '' }); };

      function markNotificationAsRead(id) {
        const readIds = JSON.parse(localStorage.getItem('sige_read_notifs') || '[]');
        if (!readIds.includes(id)) {
          readIds.push(id);
          localStorage.setItem('sige_read_notifs', JSON.stringify(readIds));
          loadNotifications();
        }
      }

      function markAllNotificationsRead() {
        const notifEls = document.querySelectorAll('#notifListContainer [onclick*="handleClickNotification"]');
        const readIds = JSON.parse(localStorage.getItem('sige_read_notifs') || '[]');
        
        notifEls.forEach(el => {
          const match = el.getAttribute('onclick')?.match(/'([^']+)'/);
          if (match && match[1] && !readIds.includes(match[1])) {
            readIds.push(match[1]);
          }
        });

        localStorage.setItem('sige_read_notifs', JSON.stringify(readIds));
        loadNotifications();
        showToast('Notificações marcadas como lidas.');
      }

      async function loadRelatorios() {
        try {
          const res = await fetch('/dashboard/stats', {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.erro);

          cachedGlobalStatsData = data;

          const expRes = await fetch('/expedientes', {
            headers: { 'Authorization': 'Bearer ' + currentToken }
          });
          if (expRes.ok) {
            const expData = await expRes.json();
            cachedExpedientesList = expData.expedientes || [];
          }

          loadNotifications();

          const defaultRole = currentUser ? currentUser.role : 'Administrador';
          switchRoleDashboard(currentActiveRoleDashboard || defaultRole);

        } catch (err) {
          showToast('Erro ao carregar métricas do dashboard: ' + err.message, true);
        }
      }
    </script>
  `;
}