import { Request, Response } from 'express';
import { registerUser, loginUser, getUsersList, createUserWithRole, updateUserRole, toggleUserStatus, recoverPassword, updateUserProfile } from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';

export async function register(req: Request, res: Response) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }
    const user = await registerUser(nome, email, senha);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }
    const resultado = await loginUser(email, senha);
    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(401).json({ erro: error.message });
  }
}

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await getUsersList();
    return res.json({ users });
  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { nome, email, senha, role, sector } = req.body;
    if (!nome || !email || !senha || !role) {
      return res.status(400).json({ erro: 'Nome, email, senha e perfil (role) são obrigatórios' });
    }
    const user = await createUserWithRole(nome, email, senha, role, sector);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function changeUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) return res.status(400).json({ erro: 'Perfil (role) é obrigatório' });

    const user = await updateUserRole(Number(id), role);
    return res.json({ mensagem: 'Perfil atualizado com sucesso', user });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function changeUserStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await toggleUserStatus(Number(id));
    return res.json({ mensagem: 'Estado do utilizador alterado', user });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function recover(req: Request, res: Response) {
  try {
    const { email, novaSenha } = req.body;
    if (!email) {
      return res.status(400).json({ erro: 'O endereço de email é obrigatório' });
    }
    const resultado = await recoverPassword(email, novaSenha);
    return res.json(resultado);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Utilizador não autenticado' });
    }
    const user = await updateUserProfile(req.usuario.id, req.body);
    return res.json({ mensagem: 'Perfil atualizado com sucesso!', user });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}