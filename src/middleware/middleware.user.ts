import { Request, Response, NextFunction } from 'express';
import { genTocken, valToken } from '../seg/access';
import { user } from '../models/user';

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    const {role} = req.query;
    let rol = role?.toString();

    if (!token) {
      res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
      return;
    }
    const payload = valToken(rol, token);
    
    if (!payload) {
      res.status(403).json({ mensaje: 'Token inválido o expirado.' });
      return;
    }
    (req as any).user = payload;
    next();
  };

export const generarToken = (req: Request, res: Response) => {
    const user = req.body; 
    const rol : string | undefined = req.params.role;
    const token = genTocken(user.role, user.user, user.password);
    token != null ? res.status(200).json({ token }) : res.status(500).json({ message : 'Error al generar token'});
  };