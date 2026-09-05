SIGE – Sistema Integrado de Gestão de Expedientes

Sistema web para registo, tramitação, acompanhamento e arquivamento de expedientes institucionais.

Sobre o Projeto

O SIGE foi desenvolvido para apoiar a gestão documental e o controlo da tramitação de expedientes dentro de organizações públicas e privadas.

A plataforma permite acompanhar o percurso de cada processo desde o registo inicial até ao arquivamento, garantindo rastreabilidade, controlo de acesso e histórico das operações realizadas pelos utilizadores.

O sistema implementa autenticação baseada em perfis de acesso (RBAC), possibilitando que cada utilizador execute apenas as ações compatíveis com a sua função.

Principais Funcionalidades

* Registo de expedientes;
* Tramitação de processos entre sectores;
* Gestão de utilizadores e perfis;
* Edição do perfil do utilizador;
* Controlo de acesso por papéis (RBAC);
* Registo de auditoria das operações;
* Consulta do histórico de tramitações;
* Arquivamento de expedientes;
* Dashboard de acompanhamento;
* Gestão de anexos e documentos associados.

Arquitetura

O projeto segue uma arquitetura em camadas para facilitar a manutenção, organização e evolução do sistema.

```text
Frontend
│
├── HTML
├── CSS / Tailwind CSS
└── JavaScript

Backend
│
├── Node.js
├── Express
├── TypeScript
│
├── Controllers
├── Services
├── Middlewares
└── Routes

Persistência
│
├── Prisma ORM
└── MySQL / MariaDB
```

Tecnologias Utilizadas

| Componente        | Tecnologia            |
| ----------------- | --------------------- |
| Linguagem         | TypeScript            |
| Runtime           | Node.js               |
| Framework Backend | Express               |
| ORM               | Prisma                |
| Banco de Dados    | MySQL / MariaDB       |
| Autenticação      | JWT                   |
| Criptografia      | bcryptjs              |
| Frontend          | HTML, CSS, JavaScript |
| Estilização       | Tailwind CSS          |
| Gráficos          | Chart.js              |

Estrutura do Projeto

```text
SIGE
│
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
│
├── src
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── middlewares
│   ├── components
│   ├── scripts
│   ├── lib
│   └── app.ts
│
├── .env
├── package.json
└── tsconfig.json
```

Perfis de Utilizador

Administrador

Responsável pela administração do sistema.

Permissões:

* Gerir utilizadores;
* Definir papéis de acesso;
* Consultar auditorias;
* Configurar o sistema.

Director

Responsável pela supervisão geral dos processos.

Permissões:

* Consultar expedientes;
* Emitir despachos;
* Visualizar relatórios.

Chefe de Sector

Responsável pela gestão dos expedientes do seu sector.

Permissões:

* Receber expedientes;
* Emitir pareceres;
* Tramitar processos.

Recepcionista

Responsável pelo registo inicial dos documentos.

Permissões:

* Registar expedientes;
* Consultar estado dos processos.

Arquivista

Responsável pelo encerramento e arquivamento.

Permissões:

* Arquivar processos;
* Consultar histórico documental.

Fluxo de Tramitação

```text
REGISTADO
     │
     ▼
EM TRAMITAÇÃO
     │
     ▼
DESPACHADO
     │
     ▼
ARQUIVADO
```

Etapas

1. Registo do expediente;
2. Encaminhamento para o sector responsável;
3. Emissão de pareceres;
4. Despacho da decisão;
5. Arquivamento do processo.

Modelo de Dados

A estrutura da base de dados é gerida através do Prisma ORM.

Principais Entidades

Role

Define os perfis de acesso existentes no sistema.

User

Armazena os utilizadores da plataforma.

Campos principais:

* nome;
* email;
* senha;
* roleId;
* sector;
* foto;
* ativo;
* criadoEm.

Expediente

Representa os processos registados.

Campos principais:

* numeroProcesso;
* titulo;
* assunto;
* remetente;
* prioridade;
* estado;
* sectorAtual;
* autorId;
* anexos.

Tramitacao

Regista as movimentações entre sectores.

AuditLog

Mantém o histórico das ações realizadas pelos utilizadores.

Instalação

Pré-requisitos

* Node.js 18 ou superior;
* NPM 9 ou superior;
* MySQL ou MariaDB.

### Clonar o Projeto

```bash
git clone https://github.com/Gilmar-Sujo/SIGE.git

cd SIGE
```
Instalar Dependências

```bash
npm install
```

Configuração do Ambiente

Criar um ficheiro `.env` na raiz do projeto.

Exemplo:

```env
PORT=3000

DATABASE_URL="mysql://root:@localhost:3306/sige_db"

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sige_db

JWT_SECRET=sua_chave_secreta
```
Configuração da Base de Dados

Criar a base de dados:

```sql
CREATE DATABASE sige_db;
```

Gerar o Prisma Client:

```bash
npx prisma generate
```

Aplicar as migrations:

```bash
npx prisma migrate deploy
```

Ou:

```bash
npm run db:migrate
```

Dados Iniciais

Executar o seed:

```bash
npm run db:seed
```

Este processo cria os dados iniciais necessários para utilização do sistema.

Executar o Projeto

Modo de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

Scripts Disponíveis

```bash
npm run dev
```

Inicia o servidor em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run lint
```

Verifica erros de TypeScript.

```bash
npm run db:generate
```

Gera o Prisma Client.

```bash
npm run db:migrate
```

Executa as migrations.

```bash
npm run db:seed
```

Insere dados iniciais.

```bash
npm run db:push
```

Sincroniza o schema com a base de dados.

Auditoria

O sistema mantém registos das operações realizadas pelos utilizadores.

São registadas ações como:

* criação de expedientes;
* atualização de dados;
* tramitações;
* despachos;
* alterações de permissões;
* operações administrativas.

Estado Atual do Projeto

* Edição de perfil implementada;
* Prisma ORM configurado;
* Migrations criadas;
* Seed configurado;
* Autenticação atualizada;
* Estrutura da base de dados organizada;
* TypeScript validado sem erros.

Credenciais Pré-configuradas para Testes de Demonstração (Demo Roles)

Para efeitos de avaliação académica e testes funcionais, o sistema disponibiliza utilizadores pré-cadastrados para cada um dos perfis RBAC (Palavra-passe padrão: `123456`):

- **Administrador:** `admin@sige.gov.mz`
- **Director Geral:** `director@sige.gov.mz`
- **Chefe de Sector:** `chefe@sige.gov.mz`
- **Recepcionista:** `maria@sige.gov.mz`

Equipa de Desenvolvimento

* Gilmar dos Santos Ribeiro
* Jamisse Joaquim

Licenca

Este projeto utiliza a licença ISC.




