import { Request, Response } from 'express'; // importar tipos explicitos de espress
import jwt from 'jsonwebtoken'; // importar jwt para generar token

export const login = (req: Request, res: Response): void => {
    // obtener usuario y contraseña del body
    const { username, password } = req.body;

    // Validación de datos ingresados
    if (!username || !password) {
        res.status(400).json({ message: 'Usuario y contraseña requeridos' });
        return;
    }

    // AUTENTICACIÓN SIMULADA:
    if (username === 'admin' && password === '1234') {
        
        // llamar a la clave desde el archivo .env
        const secret = process.env.JWT_SECRET;
        
        // validación 
        if (!secret) {
            res.status(500).json({ message: 'Error en configuración de servidor' });
            return;
        }

        // GENERACIÓN DE TOKEN
        // Payload
        const payload = { username, role: 'admin' };
        
        // Firma del token
        // Expiración -> 1 hora
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        // si las credenciales coinciden
        res.json({ 
            message: 'Autenticación exitosa', 
            token: token 
        });
        return;
    }

    // Si las credenciales no coinciden
    res.status(401).json({ message: 'Credenciales incorrectas' });
};