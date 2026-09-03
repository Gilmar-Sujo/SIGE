import 'dotenv/config';

import { PrismaClient } from '../generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? 3306);
const user = process.env.DB_USER ?? 'root';
const password = process.env.DB_PASSWORD ?? '';
const database = process.env.DB_NAME ?? 'sige_db';

const adapter = new PrismaMariaDb({
  host,
  port,
  user,
  password,
  database,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`A ligar a MariaDB: ${host}:${port}/${database} (utilizador: ${user})`);

  const roles = [
    'Recepcionista',
    'Administrador',
    'Chefe de Sector',
    'Director',
    'Arquivista',
  ];

  const roleMap: Record<string, number> = {};

  for (const nome of roles) {
    const role = await prisma.role.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });

    roleMap[nome] = role.id;
  }

  const senhaPadrao = await bcrypt.hash('123456', 10);

  const users = [
    {
      nome: 'Maria Silva',
      email: 'maria@sige.gov.mz',
      role: 'Recepcionista',
      sector: 'Recepção',
    },
    {
      nome: 'Carlos Bernardo',
      email: 'chefe.rh@sige.gov.mz',
      role: 'Chefe de Sector',
      sector: 'Recursos Humanos',
    },
    {
      nome: 'Dra. Ana Paula',
      email: 'directora@sige.gov.mz',
      role: 'Director',
      sector: 'Direcção Geral',
    },
    {
      nome: 'Tomás Mabote',
      email: 'arquivista@sige.gov.mz',
      role: 'Arquivista',
      sector: 'Arquivo Geral',
    },
    {
      nome: 'Administrador do Sistema',
      email: 'admin@sige.gov.mz',
      role: 'Administrador',
      sector: 'Secretaria Geral',
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        nome: u.nome,
        roleId: roleMap[u.role],
        sector: u.sector,
        ativo: true,
      },
      create: {
        nome: u.nome,
        email: u.email,
        senha: senhaPadrao,
        roleId: roleMap[u.role],
        sector: u.sector,
        ativo: true,
      },
    });
  }

  const usersCriados = await prisma.user.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      sector: true,
      ativo: true,
      role: {
        select: {
          nome: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  console.log('\nSeed concluído.');
  console.log('Base de dados usada:', database);
  console.log('Palavra-passe padrão: 123456');
  console.log('\nUtilizadores encontrados:');

  for (const u of usersCriados) {
    console.log(
      `- ID ${u.id}: ${u.nome} | ${u.email} | ${u.role.nome} | ${u.sector ?? 'Sem sector'} | Ativo: ${u.ativo}`,
    );
  }
}

main()
  .catch((erro) => {
    console.error('Erro ao executar o seed:', erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });