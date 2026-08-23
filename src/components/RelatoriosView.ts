export function RelatoriosView(): string {
  return `
    <div id="viewRelatorios" class="hidden space-y-6">
      
      <!-- Top Banner with Dynamic Role Dashboard Selector -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 rounded-xl border border-slate-700/80 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-slate-100 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-sky-400"></i> Painel Integrado de Gestão & Analytics (SIGE)
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">Visão operacional e estratégica segregada de acordo com as atribuições institucionais.</p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <select id="relatorioFiltroPeriodo" onchange="loadRelatorios()" class="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-sky-500">
            <option value="todos">Todo o Período</option>
            <option value="hoje">Hoje</option>
            <option value="mes">Este Mês</option>
          </select>
          <button onclick="loadRelatorios()" class="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-3 py-1.5 rounded transition shadow flex items-center gap-1.5">
            <i class="fa-solid fa-arrows-rotate"></i> Atualizar Dados
          </button>
          <button onclick="window.print()" class="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5">
            <i class="fa-solid fa-print"></i> Exportar / Imprimir
          </button>
        </div>
      </div>

      <!-- ================================================================================= -->
      <!-- DASHBOARD 1: ADMINISTRADOR (Acesso Total & Infraestrutura de Segurança) -->
      <!-- ================================================================================= -->
      <div id="dashContainer_Administrador" class="space-y-6">
        <!-- Admin Scorecards -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Total Expedientes</div>
            <div id="adminStatTotal" class="text-2xl md:text-3xl font-extrabold text-sky-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-database"></i> Registados no Sistema
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Utilizadores Activos</div>
            <div id="adminStatUtilizadores" class="text-2xl md:text-3xl font-extrabold text-indigo-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-users"></i> Contas cadastradas
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Taxa de Resolução</div>
            <div id="adminStatResolucao" class="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">--%</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-circle-check"></i> Processos concluídos
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Audit Logs Hoje</div>
            <div id="adminStatAuditCount" class="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-shield-halved"></i> Eventos monitorizados
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden col-span-2 md:col-span-1">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Status do Servidor</div>
            <div class="text-xl md:text-2xl font-extrabold text-emerald-400 mt-1 flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span> OK (Porta 3000)
            </div>
            <div class="text-[10px] text-slate-500 mt-0.5">JWT & RBAC Operacionais</div>
          </div>
        </div>

        <!-- Admin Charts Row -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
                <i class="fa-solid fa-chart-column text-sky-400"></i> Volume Global por Sector
              </h3>
              <span class="text-[10px] text-slate-400 font-mono">Global Analytics</span>
            </div>
            <div class="h-60 relative flex items-center justify-center">
              <canvas id="chartAdminSectoresCanvas"></canvas>
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-400"></i> Distribuição de Estados
              </h3>
              <span class="text-[10px] text-slate-400 font-mono">Doughnut</span>
            </div>
            <div class="h-60 relative flex items-center justify-center">
              <canvas id="chartAdminEstadosCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Admin System Quick Control Panel -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4 shadow">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
              <i class="fa-solid fa-sliders text-amber-400"></i> Atalhos de Administração e Segurança
            </h3>
            <span class="text-[10px] text-sky-400 font-mono">Super Admin Controls</span>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <button onclick="switchTab('utilizadores')" class="bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-amber-500/50 group">
              <div class="font-bold text-amber-400 group-hover:text-amber-300 flex items-center justify-between">
                <span>Gestão de Utilizadores</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">Gerir contas, alterar papéis RBAC e activar/desactivar utilizadores.</p>
            </button>

            <button onclick="openModal('modalNovoUtilizador')" class="bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-sky-500/50 group">
              <div class="font-bold text-sky-400 group-hover:text-sky-300 flex items-center justify-between">
                <span>Criar Novo Utilizador</span>
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">Registar directamente uma nova conta com perfil e sector no SIGE.</p>
            </button>

            <button onclick="switchTab('auditoria')" class="bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-indigo-500/50 group">
              <div class="font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center justify-between">
                <span>Trilha de Auditoria</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">Consultar registos de acessos, alterações de perfil e acções de utilizadores.</p>
            </button>

            <button onclick="switchTab('rbac')" class="bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-purple-500/50 group">
              <div class="font-bold text-purple-400 group-hover:text-purple-300 flex items-center justify-between">
                <span>Matriz de Permissões</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">Visualizar a tabela detalhada de privilégios e permissões por papel.</p>
            </button>

            <button onclick="loadRelatorios()" class="bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-emerald-500/50 group">
              <div class="font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center justify-between">
                <span>Recarregar Cache</span>
                <i class="fa-solid fa-arrows-rotate"></i>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">Sincronizar estatísticas do servidor e métricas de desempenho em tempo real.</p>
            </button>
          </div>
        </div>
      </div>


      <!-- ================================================================================= -->
      <!-- DASHBOARD 2: DIRECTOR GERAL (Governança Estratégica & Decisão Superior) -->
      <!-- ================================================================================= -->
      <div id="dashContainer_Director" class="hidden space-y-6">
        <!-- Director Scorecards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Pendentes de Despacho</div>
            <div id="directorStatPendentes" class="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-stamp"></i> Aguardam decisão superior
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Taxa de Resolução</div>
            <div id="directorStatTaxa" class="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">--%</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-chart-line"></i> Eficiência institucional
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Tempo Médio Resposta</div>
            <div id="directorStatTempo" class="text-2xl md:text-3xl font-extrabold text-sky-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-clock"></i> Tramitações por processo
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Processos Urgentes</div>
            <div id="directorStatUrgentes" class="text-2xl md:text-3xl font-extrabold text-rose-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <i class="fa-solid fa-triangle-exclamation"></i> Prioridade máxima
            </div>
          </div>
        </div>

        <!-- Director Strategic Action List -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
              <i class="fa-solid fa-stamp text-amber-400"></i> Processos a Aguardar Despacho do Director Geral
            </h3>
            <span class="text-[10px] text-amber-400 font-mono">Fila de Decisão Superior</span>
          </div>

          <div id="directorFilaDespachosTable" class="space-y-2 max-h-64 overflow-y-auto text-xs pr-1">
            <div class="text-slate-500 text-center py-6">A carregar processos prioritários...</div>
          </div>
        </div>
      </div>


      <!-- ================================================================================= -->
      <!-- DASHBOARD 3: CHEFE DE SECTOR (Gestão Operacional do Sector) -->
      <!-- ================================================================================= -->
      <div id="dashContainer_Chefe_de_Sector" class="hidden space-y-6">
        <!-- Chefe Scorecards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Alocados ao Teu Sector</div>
            <div id="chefeStatSectorTotal" class="text-2xl md:text-3xl font-extrabold text-sky-400 mt-1">--</div>
            <div id="chefeStatSectorNome" class="text-[10px] text-sky-300 font-semibold mt-0.5">Sector: --</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Pendentes de Parecer</div>
            <div id="chefeStatPendentesParecer" class="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Ações a emitir no sector</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Urgentes no Sector</div>
            <div id="chefeStatUrgentes" class="text-2xl md:text-3xl font-extrabold text-rose-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Atenção prioritária</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Tramitados Este Mês</div>
            <div id="chefeStatTramitados" class="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Proatividade operacional</div>
          </div>
        </div>

        <!-- Expedientes Active in Sector Table -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
              <i class="fa-solid fa-folder-open text-sky-400"></i> Processos em Trâmite no Seu Sector
            </h3>
            <span class="text-[10px] text-sky-400 font-mono">Gestão Interna de Sector</span>
          </div>

          <div id="chefeExpedientesSectorTable" class="space-y-2 max-h-72 overflow-y-auto text-xs pr-1">
            <div class="text-slate-500 text-center py-6">A carregar expedientes alocados ao seu sector...</div>
          </div>
        </div>
      </div>


      <!-- ================================================================================= -->
      <!-- DASHBOARD 4: RECEPCIONISTA / PROTOCOLO GERAL (Recepção & Triagem Inicial) -->
      <!-- ================================================================================= -->
      <div id="dashContainer_Recepcionista" class="hidden space-y-6">
        <!-- Recepcionista Scorecards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Registados Hoje</div>
            <div id="recepStatHoje" class="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Entradas no Protocolo Geral</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Guias / Recibos Emitidos</div>
            <div id="recepStatGuias" class="text-2xl md:text-3xl font-extrabold text-sky-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Comprovativos impressos</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Encaminhados a Sectores</div>
            <div id="recepStatEncaminhados" class="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Triagem e remessa efetuada</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Atendimento Rápido</div>
            <button onclick="switchTab('novo')" class="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-2 rounded text-xs transition shadow flex items-center justify-center gap-1">
              <i class="fa-solid fa-plus-circle"></i> Registar Entrada
            </button>
          </div>
        </div>

        <!-- Protocol Action Center & Recent Entries -->
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4 shadow md:col-span-1">
            <div class="border-b border-slate-700 pb-2">
              <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
                <i class="fa-solid fa-bolt text-emerald-400"></i> Ações Rápidas de Atendimento
              </h3>
              <p class="text-[11px] text-slate-400 mt-0.5">Protocolo Geral e Balcão de Recepção</p>
            </div>

            <div class="space-y-2">
              <button onclick="switchTab('novo')" class="w-full bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-emerald-500/50 flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                  <i class="fa-solid fa-file-circle-plus"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-200 text-xs">Novo Registo de Entrada</div>
                  <div class="text-[10px] text-slate-400">Dar entrada a um expediente do exterior</div>
                </div>
              </button>

              <button onclick="switchTab('expedientes')" class="w-full bg-slate-900 hover:bg-slate-950 p-3 rounded-lg border border-slate-700 text-left transition hover:border-sky-500/50 flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-bold">
                  <i class="fa-solid fa-print"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-200 text-xs">Imprimir Comprovativo / Guia</div>
                  <div class="text-[10px] text-slate-400">Emitir recibo com número de protocolo</div>
                </div>
              </button>
            </div>
          </div>

          <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow md:col-span-2">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-sky-400"></i> Últimos Expedientes Registados no Protocolo
              </h3>
              <span class="text-[10px] text-slate-400 font-mono">Entradas Diárias</span>
            </div>

            <div id="recepUltimosRegistosList" class="space-y-2 max-h-64 overflow-y-auto text-xs pr-1">
              <div class="text-slate-500 text-center py-6">A carregar registos da recepção...</div>
            </div>
          </div>
        </div>
      </div>


      <!-- ================================================================================= -->
      <!-- DASHBOARD 5: ARQUIVISTA & CUSTÓDIA DOCUMENTAL (Arquivo Permanente / Morto) -->
      <!-- ================================================================================= -->
      <div id="dashContainer_Arquivista" class="hidden space-y-6">
        <!-- Academic Explanation Note about Arquivista vs Recepcionista -->
        <div class="bg-purple-950/40 border border-purple-800/60 p-4 rounded-xl flex items-start gap-3">
          <div class="text-purple-400 text-lg mt-0.5">
            <i class="fa-solid fa-circle-info"></i>
          </div>
          <div class="text-xs text-purple-200 space-y-1">
            <span class="font-bold uppercase tracking-wider text-purple-300">Diferenciação Funcional (Bons Costumes de Gestão Documental):</span>
            <p class="leading-relaxed text-[11px] text-purple-300/90">
              Enquanto o <strong>Recepcionista</strong> actua no <em>Protocolo Geral de Entrada</em> (recepção e triagem inicial), o <strong>Arquivista</strong> é o custódio do <em>Acervo Documental Permanente e Histórico</em>. Compete ao Arquivista a selagem definitiva de processos despachados, gestão da tabela de temporalidade documental e preservação digital do arquivo morto.
            </p>
          </div>
        </div>

        <!-- Arquivista Scorecards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Acervo Permanente / Arquivado</div>
            <div id="arqStatArquivados" class="text-2xl md:text-3xl font-extrabold text-purple-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Processos na custódia digital</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Prontos p/ Arquivar</div>
            <div id="arqStatAguardando" class="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Despachados a aguardar selo</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Digitalizações & Anexos</div>
            <div id="arqStatAnexos" class="text-2xl md:text-3xl font-extrabold text-sky-400 mt-1">--</div>
            <div class="text-[10px] text-slate-500 mt-0.5">Documentos digitalizados PDF</div>
          </div>

          <div class="bg-slate-800 border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Tabela Temporalidade</div>
            <div class="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1">
              <i class="fa-solid fa-check-double"></i> Ativa (5 Anos / Perm.)
            </div>
            <div class="text-[10px] text-slate-500 mt-0.5">Conforme normas arquivísticas</div>
          </div>
        </div>

        <!-- Archival Pending Queue -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3 shadow">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 class="text-xs font-bold text-slate-100 flex items-center gap-2">
              <i class="fa-solid fa-box-archive text-purple-400"></i> Expedientes Despachados Prontos para Arquivamento Definitivo
            </h3>
            <span class="text-[10px] text-purple-300 font-mono">Custódia Final</span>
          </div>

          <div id="arqFilaAguardandoTable" class="space-y-2 max-h-72 overflow-y-auto text-xs pr-1">
            <div class="text-slate-500 text-center py-6">A carregar processos despachados para arquivamento...</div>
          </div>
        </div>
      </div>

    </div>
  `;
}
