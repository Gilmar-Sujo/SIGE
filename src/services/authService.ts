import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'sige-jwt-secret-default-key';

export async function registerUser(nome: string, email: string, senha: string) {
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
}

export async function loginUser(email: string, senha: string) {
  const cleanEmail = email ? email.toLowerCase().trim() : '';
  const normalizedEmail = cleanEmail === 'director@sige.gov.mz' ? 'directora@sige.gov.mz'
    : cleanEmail === 'chefe@sige.gov.mz' ? 'chefe.rh@sige.gov.mz'
    : cleanEmail;

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail }, include: { role: true } });
  if (!user) {
    throw new Error('Credenciais invalidas');
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) {
    throw new Error('Credenciais invalidas');
  }

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email, role: user.role.nome },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role.nome, sector: user.sector, foto: user.foto } };
}

export async function updateUserProfile(userId: number, data: { nome?: string; email?: string; foto?: string; senhaAtual?: string; novaSenha?: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('Utilizador não encontrado');
  }

  if (data.senhaAtual && data.novaSenha) {
    const senhaValida = await bcrypt.compare(data.senhaAtual, user.senha);
    if (!senhaValida) {
      throw new Error('A palavra-passe actual está incorrecta.');
    }
    user.senha = await bcrypt.hash(data.novaSenha, 10);
    await prisma.user.update({ where: { id: userId }, data: { senha: user.senha } });
  }

  if (data.nome) {
    await prisma.user.update({ where: { id: userId }, data: { nome: data.nome.trim() } });
  }

  if (data.email) {
    const cleanEmail = data.email.toLowerCase().trim();
    const outroComMesmoEmail = await prisma.user.findFirst({
      where: { email: cleanEmail, id: { not: userId } },
    });
    if (outroComMesmoEmail) {
      throw new Error('O endereço de email já está em uso por outro utilizador.');
    }
    await prisma.user.update({ where: { id: userId }, data: { email: cleanEmail } });
  }

  if (data.foto !== undefined) {
    await prisma.user.update({ where: { id: userId }, data: { foto: data.foto } });
  }

  const updated = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
  if (!updated) throw new Error('Utilizador não encontrado após atualização');

  return {
    id: updated.id,
    nome: updated.nome,
    email: updated.email,
    role: updated.role.nome,
    sector: updated.sector,
    foto: updated.foto,
  };
}

export async function getUsersList() {
  const users = await prisma.user.findMany({ include: { role: true }, orderBy: { id: 'asc' } });
  return users.map(u => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    role: u.role.nome,
    sector: u.sector || 'Geral',
    ativo: u.ativo !== false,
    criadoEm: u.criadoEm,
  }));
}

export async function createUserWithRole(nome: string, email: string, senha: string, role: string, sector?: string) {
  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    throw new Error('Email já está em uso.');
  }

  const senhaEncriptada = await bcrypt.hash(senha, 10);

  let roleObj = await prisma.role.findUnique({ where: { nome: role } });
  if (!roleObj) {
    roleObj = await prisma.role.create({ data: { nome: role } });
  }

  const newUser = await prisma.user.create({
    data: {
      nome,
      email,
      senha: senhaEncriptada,
      roleId: roleObj.id,
      sector: sector || 'Secretaria Geral',
      ativo: true,
    },
    include: { role: true },
  });

  return { id: newUser.id, nome: newUser.nome, email: newUser.email, role: newUser.role.nome, sector: newUser.sector };
}

export async function updateUserRole(userId: number, newRole: string, extra?: { nome?: string; email?: string; sector?: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('Utilizador não encontrado');

  let roleObj = await prisma.role.findUnique({ where: { nome: newRole } });
  if (!roleObj) {
    roleObj = await prisma.role.create({ data: { nome: newRole } });
  }

  const updateData: any = { roleId: roleObj.id };

  if (extra?.nome) updateData.nome = extra.nome.trim();
  if (extra?.email) {
    const cleanEmail = extra.email.toLowerCase().trim();
    const outroComMesmoEmail = await prisma.user.findFirst({
      where: { email: cleanEmail, id: { not: userId } },
    });
    if (outroComMesmoEmail) {
      throw new Error('O endereço de email já está em uso por outro utilizador.');
    }
    updateData.email = cleanEmail;
  }
  if (extra?.sector) updateData.sector = extra.sector;

  await prisma.user.update({ where: { id: userId }, data: updateData });

  const updated = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
  if (!updated) throw new Error('Utilizador não encontrado após atualização');

  return { id: updated.id, nome: updated.nome, email: updated.email, role: updated.role.nome, sector: updated.sector };
}

export async function deleteUser(userId: number, requesterId: number) {
  if (userId === requesterId) {
    throw new Error('Não pode eliminar a sua própria conta.');
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('Utilizador não encontrado');

  await prisma.user.delete({ where: { id: userId } });

  return { id: user.id, nome: user.nome };
}

export async function toggleUserStatus(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('Utilizador não encontrado');

  await prisma.user.update({ where: { id: userId }, data: { ativo: !user.ativo } });

  return { id: user.id, nome: user.nome, ativo: !user.ativo };
}

export async function recoverPassword(email: string, novaSenha?: string) {
  const cleanEmail = email ? email.toLowerCase().trim() : '';
  const normalizedEmail = cleanEmail === 'director@sige.gov.mz' ? 'directora@sige.gov.mz'
    : cleanEmail === 'chefe@sige.gov.mz' ? 'chefe.rh@sige.gov.mz'
    : cleanEmail;

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    throw new Error('Endereço de email não cadastrado no sistema.');
  }

  const senhaParaDefinir = novaSenha || '123456';
  const senhaHash = await bcrypt.hash(senhaParaDefinir, 10);

  await prisma.user.update({ where: { id: user.id }, data: { senha: senhaHash } });

  return { mensagem: 'Palavra-passe redefinida com sucesso!', email: user.email };
}