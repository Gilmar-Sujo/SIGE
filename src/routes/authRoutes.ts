import { Router, Response } from 'express';
import { register, login, recover, listUsers, createUser, changeUserRole, changeUserStatus, updateProfile } from '../controllers/authController';
import { autenticar, autorizarPapel, AuthRequest } from '../middlewares/authMiddleware';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/recover', recover);
router.put('/profile', autenticar, updateProfile);

router.get('/me', autenticar, (req: AuthRequest, res: Response) => {
  res.json({ usuario: req.usuario });
});

// Apenas Administrador e Director podem consultar, criar e gerir utilizadores
router.get('/users', autenticar, autorizarPapel(['Administrador', 'Director']), listUsers);
router.post('/users', autenticar, autorizarPapel(['Administrador', 'Director']), createUser);
router.patch('/users/:id/role', autenticar, autorizarPapel(['Administrador', 'Director']), changeUserRole);
router.patch('/users/:id/status', autenticar, autorizarPapel(['Administrador', 'Director']), changeUserStatus);

export default router;