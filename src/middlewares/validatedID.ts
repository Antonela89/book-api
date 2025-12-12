import { Request, Response, NextFunction } from 'express';

export const validateIdParam = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;

    // TypeScript aquí se quejará de "string | undefined" si tienes noUncheckedIndexedAccess
    // Validamos existencia y si es numérico
    if (!id || isNaN(parseInt(id, 10))) {
        res.status(400).json({ error: 'El parámetro ID debe ser un número válido.' });
        return; // IMPORTANTE: Detener la ejecución aquí
    }

    // Si todo está bien, pasamos al siguiente controlador
    next();
};