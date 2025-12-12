import { Request, Response, NextFunction } from 'express'; // importar tipos expecificos de express
import jwt from 'jsonwebtoken'; // importar jwt para trabajar con token

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// obtener el token del encabezado
	const authHeader = req.headers['authorization'];

	// el token llega en este formato: 'Bearer <token>'
	const token = authHeader && authHeader.split(' ')[1]; // si existe el encabezado, extrae el token

	// veriifcacion en caso de no obtener el token
	if (!token) {
		res.status(401).json({ message: 'Token no proporcionado.' });
		return;
	}

	// llamar a la clave secreta desde .env
	const secret = process.env.JWT_SECRET;

	// validacion por si existe la clave secreta
	if (!secret) {
		console.error(
			'No se ha configurado JWT_SECRET en las variables de entorno'
		);
		// manejo de respuesta y codigo 
		res.status(500).json({ message: 'Error interno del servidor' });
		return;
	}

	try {
		// verificar el token usando la clave secreta
		const decoded = jwt.verify(token, secret); // validar y decodificar

		// si el token es valido. la info decodificada se guarda en req.user
		// req as any -> para poder guardar el token validado en req.user
		(req as any).user = decoded;

		// continuar
		next();
	} catch (error) {
		// manejo de error
		res.status(403).json({ message: 'token inválido o expirado.' });
	}
};
