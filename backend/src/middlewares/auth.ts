import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendendo o Request do Express para que possamos anexar o usuário autenticado
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Padrão de header: "Bearer token"
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido. Acesso não permitido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.JWT_SECRET || 'segredo-padrao-super-seguro-mudar';
    
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    // Anexa as informações do usuário logado na requisição para que outros controllers usem
    req.user = decoded;
    
    // Passa para a próxima função (controller)
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

// Exemplo de Middleware adicional de autorização (Role Based)
export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado. Você não tem as permissões necessárias.' });
    }
    return next();
  };
};
