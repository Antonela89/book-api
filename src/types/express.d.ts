import { JwtPayload } from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload; // define que 'user' puede existir
		}
	}
}
