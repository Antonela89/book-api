import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// obtener el token del encabezado
	const authHeader = req.headers['authorization'];

	// el token llega en este formato: 'Bearer <token>'
	const token = authHeader && authHeader.split(' ')[1]; // si existe el encabezado, extrae el token

	if (!token) {
		res.status(401).json({ message: 'Token no proporcionado.' });
		return;
	}

	const secret = process.env.JWT_SECRET;

	if (!secret) {
		console.error(
			'No se ha configurado JWT_SECRET en las variables de entorno'
		);
		res.status(500).json({ message: 'Error interno del servidor' });
		return;
	}

	try {
		// verificar el token usando la clave secreta
		const decoded = jwt.verify(token, secret); // validar y decodificar

		// si el token es valido. la info decodificada se guarda en req.user
		req.user = decoded;

		next();
	} catch (error) {
		res.status(403).json({ message: 'token inválido o expirado.' });
	}
};
