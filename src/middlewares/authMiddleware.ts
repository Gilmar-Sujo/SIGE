import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  usuario?: { id: number; nome: string; email: string; role: string };
}

export function autenticar(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token nao fornecido' });
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'sige-jwt-secret-default-key';
    const payload = jwt.verify(token, secret) as {
      id: number;
      nome?: string;
      email: string;
      role: string;
    };
    req.usuario = {
      id: payload.id,
      nome: payload.nome || payload.email.split('@')[0] || 'Utilizador',
      email: payload.email,
      role: payload.role
    };
    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token invalido ou expirado' });
  }
}

export function autorizarPapel(papeisPermitidos: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Utilizador não autenticado' });
    }

    if (!papeisPermitidos.includes(req.usuario.role) && req.usuario.role !== 'Administrador') {
      return res.status(403).json({ 
        erro: `Acesso negado: O seu perfil (${req.usuario.role}) não tem permissão para esta acção.` 
      });
    }

    return next();
  };
}
