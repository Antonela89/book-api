import express, {Request, Response, NextFunction} from 'express'; // importar los tipos explicitos de express
import cors from 'cors'; // importar cors para peticiones cruzadas
import dotenv from 'dotenv'; // importar dotenv para usar .env
// importar routers necesarios 
import bookRouter from './routes/book-routes';
import authRouter from './routes/auth-routes'; 
// importar middlewares
import { verifyToken } from './middlewares/authentication';
import { errorMiddleware } from './middlewares/error';

dotenv.config(); //carga las variables del .env

const app = express(); // instancia de express

// formateo de express para respuestas
app.use(express.json()); // siempre va primero

app.use(cors());

// middleware global
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next(); 
})

// msj de bienvenida
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "API de gestión de Libros 📓" });
});

// Ruta Pública -> Login no necesita token para entrar
app.use('/auth', authRouter);

// Rutas protegidas
// Requiere verificación
app.use('/books', verifyToken, bookRouter)

// respuesta para rutas no encontradas
app.use((req:Request, res: Response) => {
    res.status(404).json({Error: "Endpoint no encontrada."})
})

// middleware generar para errores
app.use(errorMiddleware)

// definicion de puerto
const PORT = 3000;

// activar la app para la escucha de peticiones
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
