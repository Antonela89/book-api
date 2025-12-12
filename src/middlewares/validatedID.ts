import { Request, Response, NextFunction } from 'express'; // importar los tipos expecificos de express

export const validateIdParam = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params; // obtener id desde el parametro de la peticion

    // Validar existencia y si es numérico
    if (!id || isNaN(parseInt(id, 10))) {
        res.status(400).json({ error: 'El parámetro ID debe ser un número válido.' });
        return; // detener ejecucion
    }

    // Si todo está bien, pasamos al siguiente controlador
    next();
};