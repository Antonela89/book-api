// importamos los tipos expecificos de express
import { Request, Response, NextFunction } from 'express';

// middleware para un error general
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction):void  => {
    console.error(`Error: ${err.message}`)

    res.status(500).json({error: "Ha ocurrido un error."})
}
