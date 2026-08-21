export function Modals(): string {
  return `
    <!-- MODAL: Tramitar Expediente -->
    <div id="modalTramitar" class="fixed inset-0 bg-black/70 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 class="font-bold text-slate-100 text-sm flex items-center gap-2">
            <i class="fa-solid fa-share text-sky-400"></i> Tramitar Expediente <span id="modalTramitarNum" class="text-sky-300 font-mono"></span>
          </h3>
          <button onclick="closeModal('modalTramitar')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form onsubmit="handleExecuteTramitar(event)" class="space-y-3 text-xs">
          <input type="hidden" id="tramitarExpId">
          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Sector de Destino *</label>
            <select id="tramitarDestino" required class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Finanças">Finanças</option>
              <option value="Secretaria Geral">Secretaria Geral</option>
              <option value="Direcção Geral">Direcção Geral</option>
              <option value="Arquivo Geral">Arquivo Geral</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Parecer / Nota de Encaminhamento *</label>
            <textarea id="tramitarParecer" required rows="3" placeholder="Insira as instruções ou nota de informação para o sector destinatário..." class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none"></textarea>
          </div>

          <div class="flex justify-end space-x-2 pt-2 border-t border-slate-700">
            <button type="button" onclick="closeModal('modalTramitar')" class="bg-slate-700 text-slate-300 px-3 py-1.5 rounded">Cancelar</button>
            <button type="submit" class="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-4 py-1.5 rounded">Tramitar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Emitir Despacho -->
    <div id="modalDespacho" class="fixed inset-0 bg-black/70 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 class="font-bold text-slate-100 text-sm flex items-center gap-2">
            <i class="fa-solid fa-stamp text-amber-400"></i> Proferir Despacho Oficial <span id="modalDespachoNum" class="text-amber-300 font-mono"></span>
          </h3>
          <button onclick="closeModal('modalDespacho')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form onsubmit="handleExecuteDespacho(event)" class="space-y-3 text-xs">
          <input type="hidden" id="despachoExpId">
          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Decisão Oficial *</label>
            <select id="despachoDecisao" required class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
              <option value="APROVADO">APROVADO (Deferido)</option>
              <option value="REJEITADO">REJEITADO (Indeferido)</option>
              <option value="SOLICITAR_INFORMACAO">SOLICITAR_INFORMACAO</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Texto do Despacho / Fundamentação *</label>
            <textarea id="despachoTexto" required rows="3" placeholder="Insira o texto oficial do despacho proferido..." class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none"></textarea>
          </div>

          <div class="flex justify-end space-x-2 pt-2 border-t border-slate-700">
            <button type="button" onclick="closeModal('modalDespacho')" class="bg-slate-700 text-slate-300 px-3 py-1.5 rounded">Cancelar</button>
            <button type="submit" class="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-1.5 rounded">Assinar & Emitir Despacho</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Novo Utilizador -->
    <div id="modalNovoUtilizador" class="fixed inset-0 bg-black/70 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 class="font-bold text-slate-100 text-sm flex items-center gap-2">
            <i class="fa-solid fa-user-plus text-sky-400"></i> Criar Novo Utilizador
          </h3>
          <button onclick="closeModal('modalNovoUtilizador')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form onsubmit="handleExecuteCriarUtilizador(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Nome Completo *</label>
            <input type="text" id="novoUserNome" required placeholder="Ex: João Baptista Mondlane" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition">
          </div>

          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Email de Acesso *</label>
            <div class="relative group">
              <i class="fa-solid fa-envelope absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition" id="emailIcon_novoUserEmail"></i>
              <input type="email" id="novoUserEmail" oninput="validateDynamicEmailInput(this)" required placeholder="exemplo@sige.gov.mz" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-9 py-2 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition">
              <div id="emailCheck_novoUserEmail" class="absolute right-3 top-2.5 text-emerald-400 hidden transition-all duration-200" title="Email Válido">
                <i class="fa-solid fa-circle-check text-sm"></i>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-slate-300 mb-1 font-semibold">Palavra-passe *</label>
            <div class="relative group">
              <i class="fa-solid fa-key absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition"></i>
              <input type="password" id="novoUserSenha" required placeholder="Mínimo 6 caracteres" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-10 py-2 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition">
              <button type="button" 
                onmouseenter="togglePasswordVisibility('novoUserSenha', 'novoUserLockBtn', true)" 
                onmouseleave="togglePasswordVisibility('novoUserSenha', 'novoUserLockBtn', false)"
                ontouchstart="togglePasswordVisibility('novoUserSenha', 'novoUserLockBtn', true)"
                ontouchend="togglePasswordVisibility('novoUserSenha', 'novoUserLockBtn', false)"
                id="novoUserLockBtn"
                class="absolute right-2.5 top-2 p-1 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded transition cursor-pointer flex items-center justify-center"
                title="Passe o rato para ver a palavra-passe">
                <i class="fa-solid fa-lock text-sm"></i>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-300 mb-1 font-semibold">Perfil RBAC *</label>
              <select id="novoUserRole" required class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
                <option value="Recepcionista">Recepcionista</option>
                <option value="Chefe de Sector">Chefe de Sector</option>
                <option value="Director">Director</option>
                <option value="Arquivista">Arquivista</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-300 mb-1 font-semibold">Sector Funcional</label>
              <select id="novoUserSector" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none">
                <option value="Recepção">Recepção</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Finanças">Finanças</option>
                <option value="Secretaria Geral">Secretaria Geral</option>
                <option value="Direcção Geral">Direcção Geral</option>
                <option value="Arquivo Geral">Arquivo Geral</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-2 border-t border-slate-700">
            <button type="button" onclick="closeModal('modalNovoUtilizador')" class="bg-slate-700 text-slate-300 px-3 py-1.5 rounded">Cancelar</button>
            <button type="submit" class="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-4 py-1.5 rounded">Criar Utilizador</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Detalhes do Expediente & Histórico Completo -->
    <div id="modalDetalhesExpediente" class="fixed inset-0 bg-black/75 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="p-4 bg-slate-900/80 border-b border-slate-700 flex items-center justify-between">
          <div>
            <span id="detalheProcessoBadge" class="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800"></span>
            <h3 id="detalheTitulo" class="font-bold text-slate-100 text-base mt-1"></h3>
          </div>
          <button onclick="closeModal('modalDetalhesExpediente')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>

        <div class="p-5 overflow-y-auto space-y-6 text-xs text-slate-300">
          <!-- Metadata grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/60">
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider">Remetente</div>
              <div id="detalheRemetente" class="font-semibold text-slate-200 mt-0.5"></div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider">Prioridade</div>
              <div id="detalhePrioridade" class="mt-0.5"></div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider">Estado Actual</div>
              <div id="detalheEstado" class="mt-0.5"></div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider">Sector Actual</div>
              <div id="detalheSector" class="font-semibold text-slate-200 mt-0.5"></div>
            </div>
          </div>

          <!-- Assunto -->
          <div>
            <h4 class="font-bold text-slate-200 text-xs mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <i class="fa-solid fa-align-left text-sky-400"></i> Descrição do Assunto
            </h4>
            <div id="detalheAssunto" class="bg-slate-900/40 p-3 rounded border border-slate-700/50 leading-relaxed text-slate-300"></div>
          </div>

          <!-- Documentos e Anexos -->
          <div>
            <h4 class="font-bold text-slate-200 text-xs mb-2 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <i class="fa-solid fa-paperclip text-sky-400"></i> Documentos & Anexos Digitais
            </h4>
            <div id="detalheAnexosList" class="flex flex-wrap gap-2"></div>
          </div>

          <!-- Histórico Timeline -->
          <div>
            <h4 class="font-bold text-slate-200 text-xs mb-3 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <i class="fa-solid fa-route text-sky-400"></i> Histórico Completo de Tramitação & Despachos
            </h4>
            <div id="detalheTimeline" class="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-700"></div>
          </div>
        </div>

        <div class="p-4 bg-slate-900/80 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
          <button id="detalheBtnImprimirGuia" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition">
            <i class="fa-solid fa-print"></i> Imprimir Comprovativo / Guia
          </button>
          <div class="flex items-center space-x-2">
            <button onclick="closeModal('modalDetalhesExpediente')" class="bg-slate-700 text-slate-300 px-4 py-1.5 rounded">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: Comprovativo de Entrada (Guia de Recepção) -->
    <div id="modalComprovativo" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-white text-slate-900 rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-300 relative font-sans space-y-4">
        <!-- Official Government Header -->
        <div class="text-center space-y-1 border-b-2 border-slate-900 pb-3">
          <div class="text-[11px] font-bold tracking-widest text-slate-700 uppercase">República de Moçambique</div>
          <div class="text-[10px] font-semibold text-slate-600 uppercase">Sistema Integrado de Gestão de Expedientes (SIGE)</div>
          <div class="text-base font-black text-slate-900 mt-2 uppercase tracking-wide">COMPROVATIVO DE RECEPÇÃO DE EXPEDIENTE</div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded border border-slate-200">
          <div>
            <div class="text-[10px] text-slate-500 uppercase font-semibold">Número do Processo</div>
            <div id="compNumeroProcesso" class="text-sm font-mono font-bold text-sky-900"></div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 uppercase font-semibold">Data e Hora de Entrada</div>
            <div id="compData" class="text-xs font-semibold text-slate-800"></div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 uppercase font-semibold">Remetente / Requerente</div>
            <div id="compRemetente" class="text-xs font-semibold text-slate-800"></div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 uppercase font-semibold">Sector de Entrada</div>
            <div id="compSector" class="text-xs font-semibold text-slate-800"></div>
          </div>
        </div>

        <div class="text-xs space-y-1">
          <div class="text-[10px] text-slate-500 uppercase font-semibold">Título do Expediente</div>
          <div id="compTitulo" class="font-bold text-slate-900"></div>
          <div class="text-[10px] text-slate-500 uppercase font-semibold mt-2">Resumo do Assunto</div>
          <div id="compAssunto" class="text-slate-700 bg-slate-50 p-2 rounded text-[11px] border border-slate-200 leading-snug"></div>
        </div>

        <!-- Simulated Barcode / QR Section -->
        <div class="flex items-center justify-between border-t border-slate-300 pt-4 text-xs">
          <div class="space-y-1">
            <div class="text-[10px] text-slate-500 uppercase">Código de Verificação Digital</div>
            <div class="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 inline-block">SIGE-VERIF-8942-MZ</div>
          </div>
          <div class="text-right">
            <div class="text-[10px] text-slate-500 uppercase">Assinatura / Carimbo do Recepcionista</div>
            <div id="compRecepcionista" class="font-bold text-slate-800 mt-1 italic border-b border-slate-400 pb-0.5 px-2"></div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center pt-3 border-t border-slate-200 no-print">
          <button onclick="closeModal('modalComprovativo')" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded text-xs">Fechar</button>
          <button onclick="window.print()" class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5">
            <i class="fa-solid fa-print"></i> Imprimir Documento
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: Visualizador de Anexo Simulado -->
    <div id="modalVisualizadorAnexo" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-xl w-full p-5 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 class="font-bold text-slate-100 text-sm flex items-center gap-2">
            <i class="fa-solid fa-file-pdf text-red-400"></i> Visualizador Digital: <span id="anexoNome" class="text-slate-200 font-mono"></span>
          </h3>
          <button onclick="closeModal('modalVisualizadorAnexo')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="bg-slate-900 border border-slate-700 rounded-lg p-6 text-center space-y-3">
          <i class="fa-solid fa-file-lines text-5xl text-sky-400/80"></i>
          <p class="text-xs text-slate-300 font-medium">Documento oficial anexado ao expediente do SIGE.</p>
          <p class="text-[11px] text-slate-400">Ficheiro digital autenticado e armazenado em repositório seguro do Governo de Moçambique.</p>
        </div>

        <div class="flex justify-between items-center border-t border-slate-700 pt-3">
          <span class="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <i class="fa-solid fa-circle-check"></i> Antivírus Verificado (PDF/A)
          </span>
          <div class="flex space-x-2">
            <button onclick="closeModal('modalVisualizadorAnexo')" class="bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded">Fechar</button>
            <button onclick="showToast('Download do anexo iniciado...', 'sucesso')" class="bg-sky-600 hover:bg-sky-500 text-white text-xs px-3 py-1.5 rounded font-semibold flex items-center gap-1">
              <i class="fa-solid fa-download"></i> Baixar Ficheiro
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: Central de Autenticação (Login & Recuperação de Senha) -->
    <div id="modalAuth" class="fixed inset-0 bg-slate-950/90 backdrop-blur-md hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        
        <!-- Header with 2 Tabs -->
        <div class="bg-slate-900 p-6 border-b border-slate-700/80 text-center relative">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg mb-3 border border-sky-400/30">
            <i class="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h3 class="text-lg font-extrabold text-slate-100 tracking-tight">Portal de Acesso SIGE</h3>
          <p class="text-xs text-slate-400 mt-1">Sistema Integrado de Gestão de Expedientes (RBAC)</p>

          <!-- 2 Sub-tabs Navigation: Login & Recover -->
          <div class="grid grid-cols-2 gap-1.5 bg-slate-800 p-1.5 rounded-xl mt-4 border border-slate-700/80 text-xs font-semibold">
            <button id="authSubTabLogin" onclick="switchAuthSubTab('login')" class="py-2 rounded-lg bg-sky-600 text-white shadow transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-right-to-bracket text-xs"></i> Iniciar Sessão
            </button>
            <button id="authSubTabRecover" onclick="switchAuthSubTab('recover')" class="py-2 rounded-lg text-slate-400 hover:text-slate-200 transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-key text-xs"></i> Recuperar Senha
            </button>
          </div>
        </div>

        <!-- Body Form Views -->
        <div class="p-6 text-xs space-y-4">
          <!-- VIEW 1: LOGIN -->
          <div id="authViewLogin" class="space-y-4">
            <form onsubmit="handleExecuteAuthLogin(event)" class="space-y-3">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Email Institucional *</label>
                <div class="relative group">
                  <i class="fa-solid fa-envelope absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition" id="emailIcon_authLoginEmail"></i>
                  <input type="email" id="authLoginEmail" oninput="validateDynamicEmailInput(this)" required placeholder="admin@sige.gov.mz" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-9 py-2 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition">
                  <div id="emailCheck_authLoginEmail" class="absolute right-3 top-2.5 text-emerald-400 hidden transition-all duration-200" title="Email Válido">
                    <i class="fa-solid fa-circle-check text-sm"></i>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Palavra-passe *</label>
                <div class="relative group">
                  <i class="fa-solid fa-key absolute left-3 top-2.5 text-slate-400 group-focus-within:text-sky-400 transition"></i>
                  <input type="password" id="authLoginSenha" required placeholder="••••••••" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-10 py-2 text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition">
                  <button type="button" 
                    onmouseenter="togglePasswordVisibility('authLoginSenha', 'authLoginLockBtn', true)" 
                    onmouseleave="togglePasswordVisibility('authLoginSenha', 'authLoginLockBtn', false)"
                    ontouchstart="togglePasswordVisibility('authLoginSenha', 'authLoginLockBtn', true)"
                    ontouchend="togglePasswordVisibility('authLoginSenha', 'authLoginLockBtn', false)"
                    id="authLoginLockBtn"
                    class="absolute right-2.5 top-2 p-1 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded transition cursor-pointer flex items-center justify-center"
                    title="Passe o rato para ver a palavra-passe">
                    <i class="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between text-[11px] pt-1">
                <label class="flex items-center text-slate-400 cursor-pointer">
                  <input type="checkbox" checked class="rounded bg-slate-900 border-slate-700 text-sky-500 mr-1.5"> Lembrar dados
                </label>
                <button type="button" onclick="switchAuthSubTab('recover')" class="text-sky-400 hover:underline">Esqueceu a palavra-passe?</button>
              </div>

              <button type="submit" class="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2 mt-2">
                <i class="fa-solid fa-right-to-bracket"></i> Entrar no Sistema
              </button>
            </form>

            <!-- Internal Registration Disclaimer Note -->
            <div class="bg-slate-900/80 border border-slate-700/80 p-3 rounded-xl text-[11px] text-slate-400 flex items-start gap-2">
              <i class="fa-solid fa-user-lock text-sky-400 text-xs mt-0.5 shrink-0"></i>
              <div>
                <span class="font-bold text-slate-300">Registo Interno:</span> O cadastro de novos utilizadores é feito estritamente pelos Administradores/Directores no painel de controlo.
              </div>
            </div>

            <!-- Quick Roles Selector for Demo Testing -->
            <div class="pt-2 border-t border-slate-700/60">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2 text-center">
                Atalhos Rápidos de Acesso (Demo Roles)
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                <button type="button" onclick="quickLogin('admin@sige.gov.mz', '123456')" class="bg-purple-950/60 hover:bg-purple-900 text-purple-300 border border-purple-800/60 p-2 rounded-lg text-left transition flex items-center gap-1.5">
                  <i class="fa-solid fa-user-shield text-purple-400"></i>
                  <span class="truncate font-semibold">Administrador</span>
                </button>
                <button type="button" onclick="quickLogin('directora@sige.gov.mz', '123456')" class="bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 p-2 rounded-lg text-left transition flex items-center gap-1.5">
                  <i class="fa-solid fa-user-tie text-indigo-400"></i>
                  <span class="truncate font-semibold">Director</span>
                </button>
                <button type="button" onclick="quickLogin('chefe.rh@sige.gov.mz', '123456')" class="bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/60 p-2 rounded-lg text-left transition flex items-center gap-1.5">
                  <i class="fa-solid fa-user-gear text-amber-400"></i>
                  <span class="truncate font-semibold">Chefe de Sector</span>
                </button>
                <button type="button" onclick="quickLogin('maria@sige.gov.mz', '123456')" class="bg-sky-950/60 hover:bg-sky-900 text-sky-300 border border-sky-800/60 p-2 rounded-lg text-left transition flex items-center gap-1.5">
                  <i class="fa-solid fa-id-card text-sky-400"></i>
                  <span class="truncate font-semibold">Recepcionista</span>
                </button>
                <button type="button" onclick="quickLogin('arquivista@sige.gov.mz', '123456')" class="bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 p-2 rounded-lg text-left transition flex items-center gap-1.5 sm:col-span-2">
                  <i class="fa-solid fa-box-archive text-emerald-400"></i>
                  <span class="truncate font-semibold">Arquivista</span>
                </button>
              </div>
            </div>
          </div>

          <!-- VIEW 2: RECOVER PASSWORD -->
          <div id="authViewRecover" class="space-y-4 hidden">
            <div class="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-200 flex items-start gap-2">
              <i class="fa-solid fa-circle-info text-amber-400 text-sm mt-0.5 shrink-0"></i>
              <div>
                <span class="font-bold text-amber-300">Recuperação de Palavra-passe:</span> Insira o seu email de acesso cadastrado para redefinir a palavra-passe da sua conta.
              </div>
            </div>

            <form onsubmit="handleExecuteAuthRecover(event)" class="space-y-3">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Email Cadastrado *</label>
                <div class="relative group">
                  <i class="fa-solid fa-envelope absolute left-3 top-2.5 text-slate-400 group-focus-within:text-amber-400 transition" id="emailIcon_authRecoverEmail"></i>
                  <input type="email" id="authRecoverEmail" oninput="validateDynamicEmailInput(this)" required placeholder="seuemail@sige.gov.mz" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-9 py-2 text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition">
                  <div id="emailCheck_authRecoverEmail" class="absolute right-3 top-2.5 text-emerald-400 hidden transition-all duration-200" title="Email Válido">
                    <i class="fa-solid fa-circle-check text-sm"></i>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Nova Palavra-passe *</label>
                <div class="relative group">
                  <i class="fa-solid fa-key absolute left-3 top-2.5 text-slate-400 group-focus-within:text-amber-400 transition"></i>
                  <input type="password" id="authRecoverNovaSenha" required placeholder="Insira a nova palavra-passe" class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-10 py-2 text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition">
                  <button type="button" 
                    onmouseenter="togglePasswordVisibility('authRecoverNovaSenha', 'authRecoverLockBtn', true)" 
                    onmouseleave="togglePasswordVisibility('authRecoverNovaSenha', 'authRecoverLockBtn', false)"
                    ontouchstart="togglePasswordVisibility('authRecoverNovaSenha', 'authRecoverLockBtn', true)"
                    ontouchend="togglePasswordVisibility('authRecoverNovaSenha', 'authRecoverLockBtn', false)"
                    id="authRecoverLockBtn"
                    class="absolute right-2.5 top-2 p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition cursor-pointer flex items-center justify-center"
                    title="Passe o rato para ver a palavra-passe">
                    <i class="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
              </div>

              <button type="submit" class="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2 mt-2">
                <i class="fa-solid fa-key"></i> Redefinir Palavra-passe
              </button>
            </form>

            <button type="button" onclick="switchAuthSubTab('login')" class="w-full text-center text-slate-400 hover:text-slate-200 text-xs py-1 transition">
              <i class="fa-solid fa-arrow-left mr-1"></i> Voltar ao Login
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL: Definições de Perfil de Utilizador -->
    <div id="modalPerfilDefinicoes" class="fixed inset-0 bg-black/70 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 class="font-bold text-slate-100 text-sm flex items-center gap-2">
            <i class="fa-solid fa-sliders text-sky-400"></i> Definições de Conta & Perfil
          </h3>
          <button onclick="closeModal('modalPerfilDefinicoes')" class="text-slate-400 hover:text-slate-200"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form onsubmit="handleSaveProfile(event)" class="space-y-4 text-xs">
          <!-- User Avatar & Profile Header -->
          <div class="flex items-center gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-700/80">
            <div class="relative group shrink-0">
              <div id="profileFotoPreview" class="w-16 h-16 rounded-full bg-sky-600/30 border-2 border-sky-400 text-sky-300 flex items-center justify-center font-bold text-xl overflow-hidden shadow-inner">
                <i class="fa-solid fa-user"></i>
              </div>
              <label for="profileFotoInput" class="absolute bottom-0 right-0 bg-sky-600 hover:bg-sky-500 text-white p-1.5 rounded-full cursor-pointer shadow transition" title="Alterar Foto de Perfil">
                <i class="fa-solid fa-camera text-[10px]"></i>
              </label>
              <input type="file" id="profileFotoInput" accept="image/*" class="hidden" onchange="handleProfileFotoPreview(event)">
            </div>

            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span id="profileCurrentRoleBadge" class="inline-block text-[10px] text-sky-300 font-bold font-mono bg-sky-950 border border-sky-800 px-2 py-0.5 rounded-full">--</span>
                <span class="text-[10px] text-slate-400 italic" title="Apenas o Administrador pode alterar o perfil/função">(Perfil protegido)</span>
              </div>
              <div id="profileHeaderName" class="font-bold text-slate-100 text-sm truncate">--</div>
              <div id="profileHeaderEmail" class="text-slate-400 text-[11px] truncate">--</div>
            </div>
          </div>

          <!-- Section: Personal Info -->
          <div class="space-y-3">
            <div class="font-bold text-slate-300 text-[11px] uppercase tracking-wider font-mono border-b border-slate-700/60 pb-1">
              Dados Pessoais
            </div>

            <div>
              <label class="block text-slate-300 mb-1 font-semibold">Nome Completo *</label>
              <input type="text" id="profileNome" required class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500 transition">
            </div>

            <div>
              <label class="block text-slate-300 mb-1 font-semibold">Endereço de Email *</label>
              <input type="email" id="profileEmail" required class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500 transition">
            </div>

            <div>
              <label class="block text-slate-400 mb-1 font-semibold">Perfil / Função (Role) <span class="text-[10px] text-amber-400 font-normal">(Inalterável pelo utilizador)</span></label>
              <input type="text" id="profileRoleDisabled" disabled value="--" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-400 cursor-not-allowed font-semibold">
            </div>
          </div>

          <!-- Section: Change Password -->
          <div class="space-y-3 pt-1">
            <div class="font-bold text-slate-300 text-[11px] uppercase tracking-wider font-mono border-b border-slate-700/60 pb-1 flex items-center justify-between">
              <span>Alterar Palavra-passe</span>
              <span class="text-[10px] text-slate-400 font-normal">(Opcional)</span>
            </div>

            <div>
              <label class="block text-slate-300 mb-1 font-semibold">Palavra-passe Actual</label>
              <input type="password" id="profileSenhaAtual" placeholder="Deixe em branco para manter a senha actual" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500 transition">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-300 mb-1 font-semibold">Nova Palavra-passe</label>
                <input type="password" id="profileNovaSenha" placeholder="Nova palavra-passe" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500 transition">
              </div>
              <div>
                <label class="block text-slate-300 mb-1 font-semibold">Confirmar Nova Senha</label>
                <input type="password" id="profileNovaSenhaConfirm" placeholder="Repita a nova palavra-passe" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500 transition">
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-2 pt-3 border-t border-slate-700">
            <button type="button" onclick="closeModal('modalPerfilDefinicoes')" class="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold px-4 py-2 rounded-lg transition">Cancelar</button>
            <button type="submit" class="bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-md">
              <i class="fa-solid fa-floppy-disk"></i> Guardar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification Container -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 border border-slate-700 text-xs px-4 py-3 rounded-lg shadow-xl hidden transition-all duration-300 z-50"></div>
  `;
}
