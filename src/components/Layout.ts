import { Header } from './Header';
import { RoleSwitcher } from './RoleSwitcher';
import { Navigation } from './Navigation';
import { ExpedientesView } from './ExpedientesView';
import { NovoExpedienteView } from './NovoExpedienteView';
import { AuditoriaView } from './AuditoriaView';
import { RelatoriosView } from './RelatoriosView';
import { RbacMatrixView } from './RbacMatrixView';
import { UtilizadoresView } from './UtilizadoresView';
import { Modals } from './Modals';
import { ClientScripts } from './ClientScripts';

export function renderDashboardPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SIGE - Sistema Integrado de Gestão de Expedientes (RBAC)</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-slate-900 text-slate-100 min-h-screen font-sans flex flex-col">
      <!-- Top Navbar -->
      ${Header()}

      <!-- Main Layout Body (Sidebar + Main Workspace) -->
      <div class="flex flex-1 relative overflow-hidden">
        <!-- Collapsible Left Sidebar -->
        ${Navigation()}

        <!-- Main Workspace View Container -->
        <main class="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 max-w-7xl mx-auto w-full">
          

          <!-- Section Views -->
          ${RelatoriosView()}
          ${ExpedientesView()}
          ${NovoExpedienteView()}
          ${AuditoriaView()}
          ${UtilizadoresView()}
          ${RbacMatrixView()}
        </main>
      </div>

      <!-- Modals and Notifications -->
      ${Modals()}

      <!-- Client Side Interactivity & Routing -->
      ${ClientScripts()}
    </body>
    </html>
  `;
}

