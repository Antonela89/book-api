import { Request, Response, NextFunction } from 'express';

// Validar POST: Todos los campos obligatorios y con tipo correcto
export const validateBookBody = (req: Request, res: Response, next: NextFunction): void => {
    const { title, author, genre, year, pages, stock } = req.body;

    // Validar que estén todos los campos
    if (!title || !author || !genre || !year || !pages || !stock) {
        res.status(400).json({ 
            error: 'Faltan campos obligatorios. Se requiere: title, author, genre, year, pages, stock.' 
        });
        return;
    }

    // Validar tipos de datos (Strings)
    if (typeof title !== 'string' || typeof author !== 'string' || typeof genre !== 'string') {
        res.status(400).json({ error: 'Los campos title, author y genre deben ser cadenas de texto.' });
        return;
    }

    // Validar tipos de datos (Números)
    if (typeof year !== 'number' || typeof pages !== 'number' || typeof stock !== 'number') {
        res.status(400).json({ error: 'Los campos year, pages y stock deben ser números.' });
        return;
    }

    // Validaciones lógicas
    if (year < 0 || pages <= 0 || stock < 0) {
        res.status(400).json({ error: 'Los valores numéricos deben ser positivos.' });
        return;
    }

    //continuar
    next();
};

// Validar PUT: Campos opcionales, pero si vienen, deben ser válidos
export const validateBookUpdate = (req: Request, res: Response, next: NextFunction): void => {
    const { title, author, genre, year, pages, stock } = req.body;

    // Validar que el body no esté vacío
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
        return;
    }

    // Validar tipos SI el campo existe (Validación parcial)
    
    // Strings
    if (title && typeof title !== 'string') {
        res.status(400).json({ error: 'El título debe ser texto.' });
        return;
    }
    if (author && typeof author !== 'string') {
        res.status(400).json({ error: 'El autor debe ser texto.' });
        return;
    }
    if (genre && typeof genre !== 'string') {
        res.status(400).json({ error: 'El género debe ser texto.' });
        return;
    }

    // Números
    if (year !== undefined && typeof year !== 'number') {
        res.status(400).json({ error: 'El año debe ser un número.' });
        return;
    }
    if (pages !== undefined && typeof pages !== 'number') {
        res.status(400).json({ error: 'Las páginas deben ser un número.' });
        return;
    }
    if (stock !== undefined && typeof stock !== 'number') {
        res.status(400).json({ error: 'El stock debe ser un número.' });
        return;
    }

    // continuar
    next();
};