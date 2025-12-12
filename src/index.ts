import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/book-routes';
import { verifyToken } from './middlewares/authentication';
import { errorMiddleware } from './middlewares/error';

dotenv.config(); //carga las variables del .env

const app = express();

// formateo de express para respuestas
app.use(express.json());

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

// ruta general de la applicacion con validacion
app.use('/books', verifyToken, router)

// respuesta para rutas no encontradas
app.use((req:Request, res: Response) => {
    res.status(404).json({Error: "Endpoint no encontrada."})
})

app.use(errorMiddleware)

// definicion de puerto
const PORT = 3000;

// activar la app para la escucha de peticiones
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
