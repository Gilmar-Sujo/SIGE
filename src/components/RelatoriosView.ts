export function RelatoriosView(): string {
  return `
    <div id="viewRelatorios" class="hidden space-y-6">

      <!-- ================================================================ -->
      <!-- HEADER PRINCIPAL                                                -->
      <!-- ================================================================ -->
      <div class="relative overflow-hidden bg-slate-800/90 rounded-2xl border border-slate-700/70 shadow-xl">
        <div class="absolute -right-16 -top-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -left-20 -bottom-24 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div class="relative p-5 md:p-6">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-chart-pie text-sky-400 text-lg"></i>
              </div>

              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-lg md:text-xl font-bold text-slate-100">
                    Painel Integrado de Gestão
                  </h2>

                  <span class="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                    SIGE
                  </span>
                </div>

                <p class="text-xs text-slate-400 mt-1 max-w-2xl">
                  Visão operacional e estratégica do sistema, adaptada às atribuições de cada perfil institucional.
                </p>

                <div class="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sistema operacional
                  <span class="text-slate-700">•</span>
                  Dados actualizados em tempo real
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">

              <div class="relative">
                <i class="fa-regular fa-calendar absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>

                <select
                  id="relatorioFiltroPeriodo"
                  onchange="loadRelatorios()"
                  class="appearance-none bg-slate-900/80 border border-slate-700 text-xs text-slate-200 rounded-lg pl-8 pr-8 py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition"
                >
                  <option value="todos">Todo o Período</option>
                  <option value="hoje">Hoje</option>
                  <option value="mes">Este Mês</option>
                </select>

                <i class="fa-solid fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 text-[9px] pointer-events-none"></i>
              </div>

              <button
                onclick="loadRelatorios()"
                class="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-sky-900/20 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <i class="fa-solid fa-arrows-rotate"></i>
                Actualizar
              </button>

              <button
                onclick="window.print()"
                class="bg-slate-700/70 hover:bg-slate-600 text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <i class="fa-solid fa-print"></i>
                Imprimir
              </button>

            </div>
          </div>
        </div>
      </div>


      <!-- ================================================================ -->
      <!-- DASHBOARD 1: ADMINISTRADOR                                      -->
      <!-- ================================================================ -->
      <div id="dashContainer_Administrador" class="space-y-6">

        <!-- KPI HEADER -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-200">
                Visão Geral do Sistema
              </h3>
              <p class="text-[10px] text-slate-500 mt-0.5">
                Indicadores gerais de funcionamento do SIGE
              </p>
            </div>

            <span class="text-[10px] text-slate-500 font-mono">
              ADMIN / OVERVIEW
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

            <!-- Total Expedientes -->
            <div class="group bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-sky-950/20">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Total Expedientes
                </span>

                <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <i class="fa-solid fa-folder-open text-xs"></i>
                </div>
              </div>

              <div id="adminStatTotal" class="text-2xl font-extrabold text-slate-100 mt-3">
                --
              </div>

              <div class="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500">
                <i class="fa-solid fa-database text-sky-400/70"></i>
                Registados no sistema
              </div>
            </div>


            <!-- Utilizadores -->
            <div class="group bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/30">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Utilizadores
                </span>

                <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <i class="fa-solid fa-users text-xs"></i>
                </div>
              </div>

              <div id="adminStatUtilizadores" class="text-2xl font-extrabold text-slate-100 mt-3">
                --
              </div>

              <div class="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500">
                <i class="fa-solid fa-circle-check text-indigo-400/70"></i>
                Contas cadastradas
              </div>
            </div>


            <!-- Resolução -->
            <div class="group bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/30">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Taxa de Resolução
                </span>

                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <i class="fa-solid fa-chart-line text-xs"></i>
                </div>
              </div>

              <div id="adminStatResolucao" class="text-2xl font-extrabold text-emerald-400 mt-3">
                --%
              </div>

              <div class="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500">
                <i class="fa-solid fa-circle-check text-emerald-400/70"></i>
                Processos concluídos
              </div>
            </div>


            <!-- Auditoria -->
            <div class="group bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/30">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Auditoria Hoje
                </span>

                <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <i class="fa-solid fa-shield-halved text-xs"></i>
                </div>
              </div>

              <div id="adminStatAuditCount" class="text-2xl font-extrabold text-slate-100 mt-3">
                --
              </div>

              <div class="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500">
                <i class="fa-solid fa-clock text-amber-400/70"></i>
                Eventos monitorizados
              </div>
            </div>


            <!-- Servidor -->
            <div class="group bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/30">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Servidor
                </span>

                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <i class="fa-solid fa-server text-xs"></i>
                </div>
              </div>

              <div class="flex items-center gap-2 mt-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>

                <span class="text-lg font-extrabold text-emerald-400">
                  Online
                </span>
              </div>

              <div class="text-[10px] text-slate-500 mt-1.5">
                Porta 3000 • JWT • RBAC
              </div>
            </div>

          </div>
        </div>


        <!-- ADMIN ANALYTICS -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">

          <!-- Volume -->
          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

            <div class="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <i class="fa-solid fa-chart-column text-xs"></i>
                </div>

                <div>
                  <h3 class="text-xs font-bold text-slate-100">
                    Volume por Sector
                  </h3>
                  <p class="text-[9px] text-slate-500 mt-0.5">
                    Distribuição global dos expedientes
                  </p>
                </div>
              </div>

              <span class="text-[9px] text-slate-500 font-mono">
                ANALYTICS
              </span>
            </div>

            <div class="p-5">
              <div class="h-64 relative flex items-center justify-center">
                <canvas id="chartAdminSectoresCanvas"></canvas>
              </div>
            </div>

          </div>


          <!-- Estados -->
          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

            <div class="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <i class="fa-solid fa-chart-pie text-xs"></i>
                </div>

                <div>
                  <h3 class="text-xs font-bold text-slate-100">
                    Distribuição de Estados
                  </h3>
                  <p class="text-[9px] text-slate-500 mt-0.5">
                    Situação actual dos processos
                  </p>
                </div>
              </div>

              <span class="text-[9px] text-slate-500 font-mono">
                STATUS
              </span>
            </div>

            <div class="p-5">
              <div class="h-64 relative flex items-center justify-center">
                <canvas id="chartAdminEstadosCanvas"></canvas>
              </div>
            </div>

          </div>

        </div>


        <!-- ADMIN QUICK ACTIONS -->
        <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

          <div class="px-5 py-4 border-b border-slate-700/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-bolt text-xs"></i>
              </div>

              <div>
                <h3 class="text-xs font-bold text-slate-100">
                  Ações Administrativas
                </h3>

                <p class="text-[9px] text-slate-500 mt-0.5">
                  Atalhos para gestão, segurança e configuração
                </p>
              </div>
            </div>

            <span class="text-[9px] text-sky-400 font-mono">
              SUPER ADMIN
            </span>

          </div>


          <div class="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

            <!-- Utilizadores -->
            <button
              onclick="switchTab('utilizadores')"
              class="group text-left bg-slate-900/70 hover:bg-slate-900 p-4 rounded-xl border border-slate-700/60 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div class="flex items-center justify-between">

                <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <i class="fa-solid fa-users-gear text-sm"></i>
                </div>

                <i class="fa-solid fa-arrow-right text-slate-700 group-hover:text-amber-400 transition"></i>
              </div>

              <div class="font-bold text-slate-200 text-xs mt-3">
                Gestão de Utilizadores
              </div>

              <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Gerir contas, papéis RBAC e estado dos utilizadores.
              </p>
            </button>


            <!-- Novo Utilizador -->
            <button
              onclick="openModal('modalNovoUtilizador')"
              class="group text-left bg-slate-900/70 hover:bg-slate-900 p-4 rounded-xl border border-slate-700/60 hover:border-sky-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div class="flex items-center justify-between">

                <div class="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <i class="fa-solid fa-user-plus text-sm"></i>
                </div>

                <i class="fa-solid fa-arrow-right text-slate-700 group-hover:text-sky-400 transition"></i>
              </div>

              <div class="font-bold text-slate-200 text-xs mt-3">
                Novo Utilizador
              </div>

              <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Criar uma nova conta com perfil e sector.
              </p>
            </button>


            <!-- Auditoria -->
            <button
              onclick="switchTab('auditoria')"
              class="group text-left bg-slate-900/70 hover:bg-slate-900 p-4 rounded-xl border border-slate-700/60 hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div class="flex items-center justify-between">

                <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <i class="fa-solid fa-shield-halved text-sm"></i>
                </div>

                <i class="fa-solid fa-arrow-right text-slate-700 group-hover:text-indigo-400 transition"></i>
              </div>

              <div class="font-bold text-slate-200 text-xs mt-3">
                Trilha de Auditoria
              </div>

              <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Consultar acessos, alterações e acções.
              </p>
            </button>


            <!-- RBAC -->
            <button
              onclick="switchTab('rbac')"
              class="group text-left bg-slate-900/70 hover:bg-slate-900 p-4 rounded-xl border border-slate-700/60 hover:border-purple-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div class="flex items-center justify-between">

                <div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <i class="fa-solid fa-key text-sm"></i>
                </div>

                <i class="fa-solid fa-arrow-right text-slate-700 group-hover:text-purple-400 transition"></i>
              </div>

              <div class="font-bold text-slate-200 text-xs mt-3">
                Matriz de Permissões
              </div>

              <p class="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Consultar privilégios e permissões por papel.
              </p>
            </button>

          </div>


          <div class="px-5 pb-5">
            <button
              onclick="loadRelatorios()"
              class="w-full bg-slate-900/50 hover:bg-slate-900 border border-dashed border-slate-700 hover:border-emerald-500/40 rounded-xl p-3 text-xs text-slate-400 hover:text-emerald-400 transition flex items-center justify-center gap-2"
            >
              <i class="fa-solid fa-arrows-rotate"></i>
              Sincronizar estatísticas e métricas
            </button>
          </div>

        </div>

      </div>


      <!-- ================================================================ -->
      <!-- DASHBOARD 2: DIRECTOR GERAL                                     -->
      <!-- ================================================================ -->
      <div id="dashContainer_Director" class="hidden space-y-6">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-slate-200">
              Visão Estratégica
            </h3>
            <p class="text-[10px] text-slate-500 mt-0.5">
              Indicadores para decisão da Direcção Geral
            </p>
          </div>

          <span class="text-[9px] text-amber-400 font-mono">
            DIRECTOR / STRATEGIC
          </span>
        </div>


        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Pendentes de Despacho
              </span>

              <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-stamp text-xs"></i>
              </div>
            </div>

            <div id="directorStatPendentes" class="text-3xl font-extrabold text-amber-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Aguardam decisão superior
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Taxa de Resolução
              </span>

              <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <i class="fa-solid fa-chart-line text-xs"></i>
              </div>
            </div>

            <div id="directorStatTaxa" class="text-3xl font-extrabold text-emerald-400 mt-3">
              --%
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Eficiência institucional
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Tempo Médio
              </span>

              <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <i class="fa-solid fa-clock text-xs"></i>
              </div>
            </div>

            <div id="directorStatTempo" class="text-3xl font-extrabold text-sky-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Tramitação por processo
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Processos Urgentes
              </span>

              <div class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <i class="fa-solid fa-triangle-exclamation text-xs"></i>
              </div>
            </div>

            <div id="directorStatUrgentes" class="text-3xl font-extrabold text-rose-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Prioridade máxima
            </p>
          </div>

        </div>


        <!-- Decision Alert -->
        <div class="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">

          <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-bell"></i>
          </div>

          <div>
            <div class="text-xs font-bold text-amber-300">
              Central de Decisão
            </div>

            <p class="text-[10px] text-amber-200/60 mt-1">
              Os processos que necessitam de despacho superior aparecem abaixo por ordem de prioridade.
            </p>
          </div>

        </div>


        <!-- Decision Queue -->
        <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

          <div class="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-stamp text-xs"></i>
              </div>

              <div>
                <h3 class="text-xs font-bold text-slate-100">
                  Processos a Aguardar Despacho
                </h3>

                <p class="text-[9px] text-slate-500 mt-0.5">
                  Fila de decisão superior
                </p>
              </div>
            </div>

            <span class="text-[9px] text-amber-400 font-mono">
              PRIORIDADE
            </span>

          </div>

          <div
            id="directorFilaDespachosTable"
            class="space-y-2 max-h-80 overflow-y-auto p-4 text-xs"
          >
            <div class="text-slate-500 text-center py-8">
              <i class="fa-solid fa-spinner fa-spin mb-2"></i>
              <div>A carregar processos prioritários...</div>
            </div>
          </div>

        </div>

      </div>


      <!-- ================================================================ -->
      <!-- DASHBOARD 3: CHEFE DE SECTOR                                   -->
      <!-- ================================================================ -->
      <div id="dashContainer_Chefe_de_Sector" class="hidden space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 class="text-sm font-bold text-slate-200">
              Gestão Operacional do Sector
            </h3>

            <p class="text-[10px] text-slate-500 mt-0.5">
              Acompanhamento dos processos sob responsabilidade do sector
            </p>
          </div>

          <span
            id="chefeStatSectorNome"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[9px] text-sky-400 font-semibold"
          >
            Sector: --
          </span>
        </div>


        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between items-center">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Processos do Sector
              </span>

              <i class="fa-solid fa-folder-open text-sky-400"></i>
            </div>

            <div id="chefeStatSectorTotal" class="text-3xl font-extrabold text-sky-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Processos alocados
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between items-center">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Pendentes de Parecer
              </span>

              <i class="fa-solid fa-file-signature text-amber-400"></i>
            </div>

            <div id="chefeStatPendentesParecer" class="text-3xl font-extrabold text-amber-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Acções a emitir
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between items-center">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Urgentes
              </span>

              <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
            </div>

            <div id="chefeStatUrgentes" class="text-3xl font-extrabold text-rose-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Atenção prioritária
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between items-center">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Tramitados
              </span>

              <i class="fa-solid fa-arrow-right-arrow-left text-emerald-400"></i>
            </div>

            <div id="chefeStatTramitados" class="text-3xl font-extrabold text-emerald-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Durante este mês
            </p>
          </div>

        </div>


        <!-- Sector Queue -->
        <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

          <div class="px-5 py-4 border-b border-slate-700/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <i class="fa-solid fa-folder-tree text-xs"></i>
              </div>

              <div>
                <h3 class="text-xs font-bold text-slate-100">
                  Processos em Trâmite no Sector
                </h3>

                <p class="text-[9px] text-slate-500 mt-0.5">
                  Gestão interna e acompanhamento operacional
                </p>
              </div>
            </div>

            <span class="text-[9px] text-sky-400 font-mono">
              SECTOR
            </span>

          </div>

          <div
            id="chefeExpedientesSectorTable"
            class="space-y-2 max-h-80 overflow-y-auto p-4 text-xs"
          >
            <div class="text-slate-500 text-center py-8">
              <i class="fa-solid fa-spinner fa-spin mb-2"></i>
              <div>A carregar expedientes do sector...</div>
            </div>
          </div>

        </div>

      </div>


      <!-- ================================================================ -->
      <!-- DASHBOARD 4: RECEPCIONISTA                                     -->
      <!-- ================================================================ -->
      <div id="dashContainer_Recepcionista" class="hidden space-y-6">

        <div>
          <h3 class="text-sm font-bold text-slate-200">
            Protocolo Geral
          </h3>

          <p class="text-[10px] text-slate-500 mt-0.5">
            Recepção, registo, triagem e encaminhamento de expedientes
          </p>
        </div>


        <!-- KPI -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Registados Hoje
              </span>

              <i class="fa-solid fa-inbox text-emerald-400"></i>
            </div>

            <div id="recepStatHoje" class="text-3xl font-extrabold text-emerald-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Entradas no protocolo
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Guias Emitidos
              </span>

              <i class="fa-solid fa-print text-sky-400"></i>
            </div>

            <div id="recepStatGuias" class="text-3xl font-extrabold text-sky-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Comprovativos impressos
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Encaminhados
              </span>

              <i class="fa-solid fa-share text-amber-400"></i>
            </div>

            <div id="recepStatEncaminhados" class="text-3xl font-extrabold text-amber-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Triagem concluída
            </p>
          </div>

        </div>


        <!-- Main Action -->
        <button
          onclick="switchTab('novo')"
          class="group relative overflow-hidden w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-2xl p-5 text-left shadow-xl shadow-emerald-950/20 transition-all duration-200 hover:-translate-y-0.5"
        >
          <div class="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/5"></div>

          <div class="relative flex items-center justify-between">

            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <i class="fa-solid fa-file-circle-plus text-white text-lg"></i>
              </div>

              <div>
                <div class="text-sm font-extrabold text-white">
                  Registar Novo Expediente
                </div>

                <div class="text-[10px] text-emerald-100 mt-1">
                  Dar entrada a um documento recebido pelo Protocolo Geral
                </div>
              </div>
            </div>

            <i class="fa-solid fa-arrow-right text-white/60 group-hover:text-white group-hover:translate-x-1 transition"></i>

          </div>
        </button>


        <!-- Recent -->
        <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

          <div class="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <i class="fa-solid fa-clock-rotate-left text-xs"></i>
              </div>

              <div>
                <h3 class="text-xs font-bold text-slate-100">
                  Últimos Expedientes Registados
                </h3>

                <p class="text-[9px] text-slate-500 mt-0.5">
                  Actividade recente do protocolo
                </p>
              </div>
            </div>

            <button
              onclick="switchTab('expedientes')"
              class="text-[9px] text-sky-400 hover:text-sky-300 transition"
            >
              Ver todos →
            </button>

          </div>

          <div
            id="recepUltimosRegistosList"
            class="space-y-2 max-h-72 overflow-y-auto p-4 text-xs"
          >
            <div class="text-slate-500 text-center py-8">
              <i class="fa-solid fa-spinner fa-spin mb-2"></i>
              <div>A carregar registos da recepção...</div>
            </div>
          </div>

        </div>

      </div>


      <!-- ================================================================ -->
      <!-- DASHBOARD 5: ARQUIVISTA                                        -->
      <!-- ================================================================ -->
      <div id="dashContainer_Arquivista" class="hidden space-y-6">

        <!-- Context -->
        <div class="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">

          <div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-box-archive"></i>
          </div>

          <div>
            <div class="text-xs font-bold text-purple-300">
              Custódia Documental
            </div>

            <p class="text-[10px] text-purple-200/60 mt-1 leading-relaxed">
              O Arquivista é responsável pela custódia, organização, preservação e
              arquivamento definitivo dos processos concluídos.
            </p>
          </div>

        </div>


        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Acervo Permanente
              </span>

              <i class="fa-solid fa-box-archive text-purple-400"></i>
            </div>

            <div id="arqStatArquivados" class="text-3xl font-extrabold text-purple-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Processos arquivados
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Prontos para Arquivar
              </span>

              <i class="fa-solid fa-inbox text-amber-400"></i>
            </div>

            <div id="arqStatAguardando" class="text-3xl font-extrabold text-amber-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Aguardam arquivamento
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Digitalizações
              </span>

              <i class="fa-solid fa-file-pdf text-sky-400"></i>
            </div>

            <div id="arqStatAnexos" class="text-3xl font-extrabold text-sky-400 mt-3">
              --
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Documentos digitalizados
            </p>
          </div>


          <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 shadow-lg">
            <div class="flex justify-between">
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Temporalidade
              </span>

              <i class="fa-solid fa-calendar-check text-emerald-400"></i>
            </div>

            <div class="text-xl font-extrabold text-emerald-400 mt-3">
              5 Anos / Perm.
            </div>

            <p class="text-[10px] text-slate-500 mt-1">
              Tabela activa
            </p>
          </div>

        </div>


        <!-- Archive Queue -->
        <div class="bg-slate-800/80 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden">

          <div class="px-5 py-4 border-b border-slate-700/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div class="flex items-center gap-3">

              <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <i class="fa-solid fa-box-archive text-xs"></i>
              </div>

              <div>
                <h3 class="text-xs font-bold text-slate-100">
                  Processos Prontos para Arquivamento
                </h3>

                <p class="text-[9px] text-slate-500 mt-0.5">
                  Custódia documental definitiva
                </p>
              </div>

            </div>

            <span class="text-[9px] text-purple-400 font-mono">
              ARQUIVO
            </span>

          </div>

          <div
            id="arqFilaAguardandoTable"
            class="space-y-2 max-h-80 overflow-y-auto p-4 text-xs"
          >
            <div class="text-slate-500 text-center py-8">
              <i class="fa-solid fa-spinner fa-spin mb-2"></i>
              <div>A carregar processos para arquivamento...</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}