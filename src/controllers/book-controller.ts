import { Request, Response } from 'express';
import { BookModel } from '../models/book-model';

export const getAllBooks = (req: Request, res: Response): void => {
	try {
		const books = BookModel.getAllBooks();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener libros.' });
	}
};

export const getBookByID = (req: Request, res: Response): void => {
	const { id } = req.params;

	const book = BookModel.getBookByID(parseInt(id as string));

	if (!book) {
		res.status(404).json({ error: 'Libro no encontrado' });
		return;
	}

	res.json(book);
};

export const postBook = (req: Request, res: Response): void => {
	const newBook = BookModel.postBook(req.body);

	res.status(201).json(newBook);
};

export const updatedBook = (req: Request, res: Response): void => {
	const { id } = req.params;

	const editBook = BookModel.updateBook(parseInt(id as string), req.body);

	if (!editBook) {
		res.status(404).json({ message: 'Libro no encontrado' });
		return;
	}

	res.status(200).json(editBook);
};

export const deleteBook = (req: Request, res: Response): void => {
	const { id } = req.params;

	const isDeleted = BookModel.deleteBook(parseInt(id as string));

	if (!isDeleted) {
		res.status(404).json({ message: 'Libro no encontrado' });
		return;
	}

	res.status(200).json({
		message: `Libro id: ${id} eliminado correctamente`,
	});
};

export const filterByAuthor = (req: Request, res: Response): void => {
	const { author } = req.query;

	try {
		const { author } = req.query;

		// Validación extra por seguridad
		if (!author || typeof author !== 'string') {
			res.status(400).json({
				error: "Parámetro 'author' inválido o faltante",
			});
			return;
		}

		const books = BookModel.findByAuthor(author);

		if (books.length === 0) {
			res.status(404).json({
				message: `No se encontraron libros para el autor: ${author}`,
			});
			return;
		}

		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ error: 'Error al filtrar libros.' });
	}
};

// Función manejadora -> Decide qué hacer basándose en si existe el query param
export const getBooks = (req: Request, res: Response): void => {
	const { author } = req.query;

	if (author) {
		// Si hay autor -> la función de filtrado
		return filterByAuthor(req, res);
	} else {
		// Si no hay autor -> función de traer todos
		return getAllBooks(req, res);
	}
};