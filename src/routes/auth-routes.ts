import { Router } from 'express'; // importar el router para manejar las rutas
import { login } from '../controllers/auth-controller'; // llamar al controlador

// instancia de router
const router = Router();

// Endpoint POST /auth/login
router.post('/login', login);

export default router; // exportar