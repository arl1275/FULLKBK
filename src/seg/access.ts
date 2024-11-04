import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';

// Llave secreta para firmar el JWT y clave de encriptación AES
const secretKey = 'my_secret_key_for_jwt'; // Cambia esta clave para el entorno de producción
const encryptionKey = crypto.randomBytes(32); // Clave de 32 bytes para AES-256
const iv = crypto.randomBytes(16); // Vector de inicialización de 16 bytes para AES

// Interfaz para definir el payload del token
interface TokenPayload extends JwtPayload {
    userId: number;
    role: string;
}

// Función para crear y firmar el token JWT
function createToken(data: TokenPayload): string {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
}

// Función para encriptar el token JWT
function encryptToken(token: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// Función para desencriptar y verificar el token JWT
function decryptTokenAndVerify(encryptedToken: string): TokenPayload | null {
    const [ivHex, encryptedData] = encryptedToken.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from(ivHex, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    try {
        const decoded = jwt.verify(decrypted, secretKey) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error('Error de verificación de token:', error);
        return null;
    }
}
