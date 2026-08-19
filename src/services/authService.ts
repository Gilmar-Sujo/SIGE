import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let prisma: any = null;

// In-memory fallback stores when MySQL database is offline
export interface UserData {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  roleId: number;
  role: string;
  sector?: string;
  foto?: string;
  ativo: boolean;
  criadoEm: Date;
}

const inMemoryRoles: any[] = [
  { id: 1, nome: 'Recepcionista' },
  { id: 2, nome: 'Administrador' },
  { id: 3, nome: 'Chefe de Sector' },
  { id: 4, nome: 'Director' },
  { id: 5, nome: 'Arquivista' }
];

const defaultHashedPassword = bcrypt.hashSync('123456', 10);

const inMemoryUsers: UserData[] = [
  {
    id: 1,
    nome: 'Maria Silva',
    email: 'maria@sige.gov.mz',
    senha: defaultHashedPassword,
    roleId: 1,
    role: 'Recepcionista',
    sector: 'Recepção',
    ativo: true,
    criadoEm: new Date(Date.now() - 86400000 * 30)
  },
  {
    id: 2,
    nome: 'Carlos Bernardo',
    email: 'chefe.rh@sige.gov.mz',
    senha: defaultHashedPassword,
    roleId: 3,
    role: 'Chefe de Sector',
    sector: 'Recursos Humanos',
    ativo: true,
    criadoEm: new Date(Date.now() - 86400000 * 25)
  },
  {
    id: 3,
    nome: 'Dra. Ana Paula',
    email: 'directora@sige.gov.mz',
    senha: defaultHashedPassword,
    roleId: 4,
    role: 'Director',
    sector: 'Direcção Geral',
    ativo: true,
    criadoEm: new Date(Date.now() - 86400000 * 20)
  },
  {
    id: 4,
    nome: 'Tomás Mabote',
    email: 'arquivista@sige.gov.mz',
    senha: defaultHashedPassword,
    roleId: 5,
    role: 'Arquivista',
    sector: 'Arquivo Geral',
    ativo: true,
    criadoEm: new Date(Date.now() - 86400000 * 15)
  },
  {
    id: 5,
    nome: 'Administrador do Sistema',
    email: 'admin@sige.gov.mz',
    senha: defaultHashedPassword,
    roleId: 2,
    role: 'Administrador',
    sector: 'Secretaria Geral',
    ativo: true,
    criadoEm: new Date(Date.now() - 86400000 * 40)
  }
];

try {
  const { PrismaClient } = require('@prisma/client');
  const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sige_db',
  });
  prisma = new PrismaClient({ adapter });
} catch (err: any) {
  console.warn('[AI Studio] Could not initialize Prisma MariaDB adapter, using in-memory store:', err.message);
  prisma = null;
}

const JWT_SECRET = process.env.JWT_SECRET || 'sige-jwt-secret-default-key';

export async function registerUser(nome: string, email: string, senha: string) {
  if (prisma) {
    try {
      const existente = await prisma.user.findUnique({ where: { email } });
      if (existente) {
        throw new Error('Email ja registado');
      }

      const senhaEncriptada = await bcrypt.hash(senha, 10);

      let role = await prisma.role.findUnique({ where: { nome: 'Recepcionista' } });
      if (!role) {
        role = await prisma.role.create({ data: { nome: 'Recepcionista' } });
      }

      const user = await prisma.user.create({
        data: { nome, email, senha: senhaEncriptada, roleId: role.id },
      });

      return { id: user.id, nome: user.nome, email: user.email };
    } catch (error: any) {
      if (error.message === 'Email ja registado') {
        throw error;
      }
      console.warn('[AI Studio] DB connection failed during registerUser, falling back to in-memory store:', error.message);
    }
  }

  // Fallback in-memory
  const existente = inMemoryUsers.find(u => u.email === email);
  if (existente) {
    throw new Error('Email ja registado');
  }

  const senhaEncriptada = await bcrypt.hash(senha, 10);
  let role = inMemoryRoles.find(r => r.nome === 'Recepcionista');
  if (!role) {
    role = { id: inMemoryRoles.length + 1, nome: 'Recepcionista' };
    inMemoryRoles.push(role);
  }

  const user: UserData = {
    id: inMemoryUsers.length + 1,
    nome,
    email,
    senha: senhaEncriptada,
    roleId: role.id,
    role: 'Recepcionista',
    sector: 'Recepção',
    ativo: true,
    criadoEm: new Date()
  };
  inMemoryUsers.push(user);

  return { id: user.id, nome: user.nome, email: user.email };
}

export async function loginUser(email: string, senha: string) {
  const cleanEmail = email ? email.toLowerCase().trim() : '';
  const normalizedEmail = cleanEmail === 'director@sige.gov.mz' ? 'directora@sige.gov.mz'
    : cleanEmail === 'chefe@sige.gov.mz' ? 'chefe.rh@sige.gov.mz'
    : cleanEmail;

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({ where: { email: normalizedEmail }, include: { role: true } });
      if (user) {
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
          throw new Error('Credenciais invalidas');
        }

        const token = jwt.sign(
          { id: user.id, nome: user.nome, email: user.email, role: user.role.nome },
          JWT_SECRET,
          { expiresIn: '8h' }
        );

        return { token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role.nome } };
      }
    } catch (error: any) {
      if (error.message === 'Credenciais invalidas') {
        throw error;
      }
      console.warn('[AI Studio] DB connection failed during loginUser, falling back to in-memory store:', error.message);
    }
  }

  // Fallback in-memory
  const user = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    throw new Error('Credenciais invalidas');
  }

  if (user.senha) {
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      throw new Error('Credenciais invalidas');
    }
  }

  const roleName = typeof user.role === 'string' ? user.role : 'Recepcionista';

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email, role: roleName },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token, user: { id: user.id, nome: user.nome, email: user.email, role: roleName, sector: user.sector, foto: user.foto } };
}

export async function updateUserProfile(userId: number, data: { nome?: string; email?: string; foto?: string; senhaAtual?: string; novaSenha?: string }) {
  const user = inMemoryUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error('Utilizador não encontrado');
  }

  if (data.senhaAtual && data.novaSenha) {
    if (user.senha) {
      const senhaValida = await bcrypt.compare(data.senhaAtual, user.senha);
      if (!senhaValida) {
        throw new Error('A palavra-passe actual está incorrecta.');
      }
    }
    user.senha = await bcrypt.hash(data.novaSenha, 10);
  }

  if (data.nome) user.nome = data.nome.trim();
  if (data.email) {
    const cleanEmail = data.email.toLowerCase().trim();
    const outroComMesmoEmail = inMemoryUsers.find(u => u.id !== userId && u.email.toLowerCase() === cleanEmail);
    if (outroComMesmoEmail) {
      throw new Error('O endereço de email já está em uso por outro utilizador.');
    }
    user.email = cleanEmail;
  }

  if (data.foto !== undefined) {
    user.foto = data.foto;
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
    sector: user.sector,
    foto: user.foto
  };
}

export async function getUsersList() {
  return inMemoryUsers.map(u => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    role: u.role,
    sector: u.sector || 'Geral',
    ativo: u.ativo !== false,
    criadoEm: u.criadoEm
  }));
}

export async function createUserWithRole(nome: string, email: string, senha: string, role: string, sector?: string) {
  const existente = inMemoryUsers.find(u => u.email === email);
  if (existente) {
    throw new Error('Email já está em uso.');
  }

  const senhaEncriptada = await bcrypt.hash(senha, 10);
  const roleObj = inMemoryRoles.find(r => r.nome === role) || { id: 1, nome: role };

  const newUser: UserData = {
    id: inMemoryUsers.length + 1,
    nome,
    email,
    senha: senhaEncriptada,
    roleId: roleObj.id,
    role,
    sector: sector || 'Secretaria Geral',
    ativo: true,
    criadoEm: new Date()
  };

  inMemoryUsers.push(newUser);
  return { id: newUser.id, nome: newUser.nome, email: newUser.email, role: newUser.role, sector: newUser.sector };
}

export async function updateUserRole(userId: number, newRole: string) {
  const user = inMemoryUsers.find(u => u.id === userId);
  if (!user) throw new Error('Utilizador não encontrado');

  const roleObj = inMemoryRoles.find(r => r.nome === newRole) || { id: 1, nome: newRole };
  user.role = newRole;
  user.roleId = roleObj.id;
  return { id: user.id, nome: user.nome, email: user.email, role: user.role };
}

export async function toggleUserStatus(userId: number) {
  const user = inMemoryUsers.find(u => u.id === userId);
  if (!user) throw new Error('Utilizador não encontrado');

  user.ativo = !user.ativo;
  return { id: user.id, nome: user.nome, ativo: user.ativo };
}

export async function recoverPassword(email: string, novaSenha?: string) {
  const cleanEmail = email ? email.toLowerCase().trim() : '';
  const normalizedEmail = cleanEmail === 'director@sige.gov.mz' ? 'directora@sige.gov.mz'
    : cleanEmail === 'chefe@sige.gov.mz' ? 'chefe.rh@sige.gov.mz'
    : cleanEmail;

  const user = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    throw new Error('Endereço de email não cadastrado no sistema.');
  }

  const senhaParaDefinir = novaSenha || '123456';
  user.senha = await bcrypt.hash(senhaParaDefinir, 10);
  return { mensagem: 'Palavra-passe redefinida com sucesso!', email: user.email };
}