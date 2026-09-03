import { PrismaClient } from '../src/generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sige_db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = ['Recepcionista', 'Administrador', 'Chefe de Sector', 'Director', 'Arquivista'];
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
    { nome: 'Maria Silva', email: 'maria@sige.gov.mz', role: 'Recepcionista', sector: 'Recepção' },
    { nome: 'Carlos Bernardo', email: 'chefe.rh@sige.gov.mz', role: 'Chefe de Sector', sector: 'Recursos Humanos' },
    { nome: 'Dra. Ana Paula', email: 'directora@sige.gov.mz', role: 'Director', sector: 'Direcção Geral' },
    { nome: 'Tomás Mabote', email: 'arquivista@sige.gov.mz', role: 'Arquivista', sector: 'Arquivo Geral' },
    { nome: 'Administrador do Sistema', email: 'admin@sige.gov.mz', role: 'Administrador', sector: 'Secretaria Geral' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
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

  console.log('Seed concluído. Palavra-passe padrão para todos: 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
