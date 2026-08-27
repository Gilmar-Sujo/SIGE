# SIGE — Sistema Integrado de Gestão de Expedientes

> **Documentação Técnica e Académica**  
> *Projecto de Engenharia de Software e Gestão Documental Institucional*


## 📋 Resumo Executivo / Abstract

O **SIGE (Sistema Integrado de Gestão de Expedientes)** é uma plataforma web desenvolvida para otimizar, automatizar e auditá-la a tramitação de documentos e expedientes em instituições públicas e privadas. O sistema responde aos desafios clássicos da gestão documental tradicional — como a morosidade nos fluxos de trabalho, a perda ou extravio de processos físicos, a opacidade no acompanhamento de prazos e a vulnerabilidade no acesso à informação sensível.

Através de uma arquitetura modular moderna e segura, baseada em **Controlo de Acesso Baseado em Papéis (RBAC - Role-Based Access Control)**, o SIGE garante que cada interveniente da hierarquia institucional (Recepcionistas, Chefes de Sector, Directores, Arquivistas e Administradores) exerça exclusivamente as atribuições inerentes ao seu perfil funcional, registando cada ação num repositório imutável de auditoria.



## 🎯 Contextualização e Problema Académico

Na administração pública e corporativa, o fluxo de expedição, receção, parecer e despacho de documentos representa a espinha dorsal da tomada de decisão. Contudo, a persistência de processos manuais ou semi-automatizados acarreta constrangimentos estruturais:

1. **Incapacidade de Rastreabilidade em Tempo Real:** Dificuldade em determinar em que sector ou com que responsável se encontra um processo num determinado momento.
2. **Vulnerabilidade de Segurança:** Acesso não autorizado a documentos confidenciais devido à ausência de mecanismos rigorosos de autenticação e autorização granulada.
3. **Ausência de Histórico de Decisões:** Dificuldade em reconstituir a linha temporal de pareceres e despachos exarados sobre um determinado expediente.
4. **Ineficiência Operacional:** Atrasos na tomada de decisão provocados pela falta de métricas e indicadores de desempenho (KPIs) sobre o tempo médio de tramitação.

O SIGE resolve estas problemáticas implementando uma **esteira digital centralizada e rastreável**, alinhada com as melhores práticas internacionais de Engenharia de Software e Segurança da Informação.



## 🏛️ Arquitectura do Sistema

O sistema foi concebido segundo os princípios da **Arquitectura RESTful** e **Separação de Responsabilidades (SoC)**, combinando um servidor robusto com uma interface dinâmica e responsiva.


┌────────────────────────────────────────────────────────────────────────┐
│                        CAMADA DE APRESENTAÇÃO                          │
│     (HTML5 Semântico, Tailwind CSS, FontAwesome, Chart.js, Vanilla JS)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Requisições HTTP (Fetch API)
                                    │ Bearer Token JWT
┌───────────────────────────────────▼────────────────────────────────────┐
│                       CAMADA DE APLICAÇÃO (API)                        │
│            Node.js / Express / TypeScript (Motor RESTful)              │
│  ┌─────────────────────────┬────────────────────────┬────────────────┐ │
│  │ Middlewares Auth (JWT)  │   Controladores REST   │ Auditoria Log  │ │
│  └─────────────────────────┴────────────────────────┴────────────────┘ │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ ORM / Acesso a Dados
┌───────────────────────────────────▼────────────────────────────────────┐
│                         CAMADA DE PERSISTÊNCIA                         │
│                    Prisma ORM / Banco de Dados SQL                     │
└────────────────────────────────────────────────────────────────────────┘


### Princípios Arquitectónicos Adoptados:
- **Design RESTful:** Comunicação desacoplada através de endpoints previsíveis (`/expedientes`, `/auth`, `/auditoria`, `/dashboard`).
- **Segurança Defensiva (Defense in Depth):**
  - Autenticação stateless baseada em **JSON Web Tokens (JWT)**.
  - Encriptação unidirecional de palavras-passe com **bcryptjs** (salt factor de 10).
  - Validação estrita de papéis nos endpoints do servidor via middleware `autorizarPapel(...)`.
- **Auditoria Imutável (Audit Trail):** Cada transação de criação, alteração de estado, despacho ou alteração de privilégio é registada com timestamp, IP/Sessão e utilizador responsável.



## 🔐 Matriz de Permissões e Perfis (RBAC Matrix)

O controlo de acesso baseia-se no princípio do **Menor Privilégio (Principle of Least Privilege)**:

| Perfil | Descrição e Escopo Funcional | Permissões Principais |
| :--- | :--- | :--- |
| **Administrador** | Gestão técnica da plataforma e infraestrutura de acesso. | Criar/Gerir Utilizadores, Alterar Papéis RBAC, Consultar Logs de Auditoria Globais. |
| **Director** | Decisão estratégica, superintendência e supervisão geral. | Emitir Despachos Finais, Visualizar Relatórios & KPIs, Aceder à Gestão de Utilizadores e Auditoria. |
| **Chefe de Sector** | Gestão operacional de expedientes alocados ao seu sector. | Tramitar Expedientes para outros sectores, Emitir Pareceres Técnicos, Registar Despachos Sectoriais. |
| **Recepcionista** | Porta de entrada dos documentos físicos e digitais na instituição. | Registar Novos Expedientes, Gerar e Imprimir Guias de Recepção/Comprovativos de Entrada. |
| **Arquivista** | Encerramento, custódia digital e preservação de processos. | Concluir e Arquivar Expedientes Despachados, Gerir Acervo Histórico. |


## ⚙️ Fluxo Operacional de Tramitação (Lifecycle)

A vida útil de um expediente no SIGE obedece ao seguinte ciclo de estados:

mermaid
stateDiagram-v2
    [*] --> REGISTADO: Entrada na Recepção (Criar Expediente)
    REGISTADO --> EM_TRAMITACAO: Tramitado para Sector Competente
    EM_TRAMITACAO --> EM_TRAMITACAO: Encaminhamento entre Sectores / Parecer
    EM_TRAMITACAO --> DESPACHADO: Decisão / Despacho pelo Director ou Chefe
    DESPACHADO --> ARQUIVADO: Conclusão & Arquivo pelo Arquivista / Sistema
    ARQUIVADO --> [*]


1. **Registo:** Entrada do documento com atribuição de número único de processo (ex: `EXP-2026-0001`), classificação de prioridade (*NORMAL*, *URGENTE*, *BAIXA*) e digitalização de anexos.
2. **Tramitação:** Remessa sequencial entre sectores com registo obrigatório do motivo e despacho/parecer preliminar.
3. **Despacho:** Assinatura digital da decisão final (Deferido, Indeferido, Para Cumprimento, Encaminhado).
4. **Arquivo:** Encerramento formal do processo e transição para consulta histórica.


## 🛠️ Stack Tecnológica

| Componente | Tecnologia | Justificação Técnica / Académica |

| **Linguagem Principal** | **TypeScript 5+** | Tipagem estática em tempo de compilação, prevenindo erros em runtime e garantindo manutenibilidade. |
| **Ambiente de Execução** | **Node.js** | Arquitectura orientada a eventos e I/O não-bloqueante ideal para APIs REST concorrentes. |
| **Framework Web** | **Express.js 5** | Leveza, flexibilidade e suporte maduro para middlewares de autenticação e rotas. |
| **Autenticação & Criptografia** | **JWT & Bcryptjs** | Padrão da indústria para autenticação segura e hashing irreversível de credenciais. |
| **Camada de Dados (ORM)** | **Prisma ORM** | Abstração segura contra SQL Injection, migrations declarativas e queries fortemente tipadas. |
| **Interface / Frontend** | **HTML5 + Tailwind CSS** | Design intuitivo, responsivo e de alta performance visual sem sobrecarga de frameworks pesados. |
| **Visualização de Métricas** | **Chart.js** | Renderização em tempo real de gráficos estatísticos (Doughnut, Bar, Polar Area) para tomada de decisão. |



## 🚀 Guia de Instalação e Execução

### 1. Pré-requisitos
- **Node.js**: Versão 18.x ou superior.
- **NPM**: Versão 9.x ou superior.

### 2. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/Gilmar-Sujo/SIGE.git
cd SIGE
npm install
```

### 3. Configuração do Ambiente (`.env`)
Crie ou modifique o ficheiro `.env` na raiz do projecto:
```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sige_chave_secreta_academica_2026_rbac_token"
NODE_ENV="development"
```

### 4. Execução em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor estará acessível em `http://localhost:3000`.

### 5. Compilação e Execução em Produção
```bash
npm run build
npm start
```



## 📊 Credenciais Pré-configuradas para Testes de Demonstração (Demo Roles)

Para efeitos de avaliação académica e testes funcionais, o sistema disponibiliza utilizadores pré-cadastrados para cada um dos perfis RBAC (Palavra-passe padrão: `123456`):

- **Administrador:** `admin@sige.gov.mz`
- **Director Geral:** `director@sige.gov.mz`
- **Chefe de Sector:** `chefe@sige.gov.mz`
- **Recepcionista:** `maria@sige.gov.mz`



## 🎓 Contribuição Académica e Próximos Passos

Esta implementação demonstra a viabilidade prática da transformação digital na administração documental. Como linhas de investigação e desenvolvimento futuro, destacam-se:

1. **Assinatura Digital Qualificada (PKI / Chave Pública):** Integração de certificados digitais para validação jurídica de despachos.
2. **Reconhecimento Óptico de Caracteres (OCR):** Indexação automática do conteúdo textual de documentos digitalizados em PDF.
3. **Notificações Push / WebSocket em Tempo Real:** Alertas instantâneos sobre a chegada de novos processos urgentes ao sector.



## 📝 Licença e Autoria

- **Autor:** GILMAR DOS SANTOS RIBEIRO & JAMISSE JOAQUIM / Equipa de Desenvolvimento SIGE
- **Repositório:** [https://github.com/Gilmar-Sujo/SIGE](https://github.com/Gilmar-Sujo/SIGE)
- **Licença:** ISC (Internet Systems Consortium License)
