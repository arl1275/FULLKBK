import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const Hkey = process.env.HIGHPASSWORD
const Mkey = process.env.M_PASSWORD
const Lkey = process.env.L_PASSWORD

// 1 : superadmin, 2 : admin, 3 : user
const ReKey = (rol : string) =>{
    if(rol === 'superadmin') return Hkey?.toString();
    else if(rol === 'admin') return Mkey?.toString();
    else if(rol === 'user') return Lkey?.toString();
    else return null
}

export const genTocken = (role : string, user : string, password : string) =>{
  try {
    const payload = {role_ : role, user_ : user, password_ : password};
    const key = ReKey(role);
    console.log('key lood :', key)
    if(key != null)
       return jwt.sign(payload, key, { expiresIn: '2h' });
    else
        return null 

  } catch (error) {
    console.log('error de generacion token : ', error);
    return null;
  }
}

export const valToken = (role: string | undefined, token: string | undefined): object | null => {
    try {
      if (!role || !token) {
        console.log('Role o token no especificados');
        return null;
      }
  
      const key = ReKey(role); 
      console.log('data de key ', key, role)
      if (!key) {
        console.log('Clave no encontrada para el rol especificado');
        return null;
      }
  
      // Verifica el token con la clave obtenida
      return jwt.verify(token, key, { algorithms: ['HS256'] }) as object;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return null;
    }
  };
