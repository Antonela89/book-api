import { Request, Response } from 'express'; // importación de los tipos especificos de express
import { BookModel } from '../models/book-model'; // importación del modelo

// controlador para traer todos los libros
export const getAllBooks = (req: Request, res: Response): void => {
	try {
		const books = BookModel.getAllBooks(); // llamar al modelo
		res.json(books); // respuesta
	} catch (error) {
		// manejo de errores
		// manejo de codigo de respuesta y msj al usuario
		res.status(500).json({ error: 'Error al obtener libros.' });
	}
};

// controlador para traer libro por id
export const getBookByID = (req: Request, res: Response): void => {
	const { id } = req.params; // obtener id desde el parametro

	// llamar al modelo
	// id as string -> le asegura a TS que el id obtenido es de tipo string, sino TS infiere que puede ser undefined
	const book = BookModel.getBookByID(parseInt(id as string));

	// validación si no se encuentra el libro
	if (!book) {
		// manejo de codigo de respuesta y msj al usuario
		res.status(404).json({ error: 'Libro no encontrado' });
		return; // cortar ejecucion
	}

	// busqueda exitosa -> devuelve el libro encontrado
	res.json(book);
};

// controlador para crear un libro
export const postBook = (req: Request, res: Response): void => {
	const newBook = BookModel.postBook(req.body); // llamar al modelo, la info del libro se obtiene desde el cuerpo de la petición

	// codigo y respuesta al usuario -> devuelve el libro creado
	res.status(201).json(newBook);
};

// controlador para editar un libro
export const updatedBook = (req: Request, res: Response): void => {
	const { id } = req.params; // obtener id desde el parametro

	// llamar al modelo
	// id as string
	// req.body -> información a editar
	const editBook = BookModel.updateBook(parseInt(id as string), req.body);

	// validación si no se encuentra el libro por id
	if (!editBook) {
		res.status(404).json({ message: 'Libro no encontrado' });
		return; // detener ejecucion
	}

	// exito -> devuelve libro editado
	res.status(200).json(editBook);
};

// controlador para eliminar un libro
export const deleteBook = (req: Request, res: Response): void => {
	const { id } = req.params; // obtener id desde el parametro

	// llamar la modelo -> logica de negocio -> devuelve true o falase
	const isDeleted = BookModel.deleteBook(parseInt(id as string));

	// validacion en caso de false, null o undefined
	if (!isDeleted) {
		res.status(404).json({ message: 'Libro no encontrado' });
		return; // detener ejecucion
	}

	// respuesa exitosa
	res.status(200).json({
		message: `Libro id: ${id} eliminado correctamente`,
	});
};

// controlador para filtrar por autor
export const filterByAuthor = (req: Request, res: Response): void => {
	try {
		const { author } = req.query; // obtener el parametro de busqueda desde query.params

		// Validación extra por seguridad
		if (!author || typeof author !== 'string') {
			res.status(400).json({
				error: "Parámetro 'author' inválido o faltante",
			});
			return;
		}

		// llamar al modelo
		const books = BookModel.findByAuthor(author);

		// si el array obtenido da 0 resultados
		if (books.length === 0) {
			res.status(404).json({
				message: `No se encontraron libros para el autor: ${author}`,
			});
			return;
		}

		// respuesta exitosa -> lista de libros del autor solicitado
		res.status(200).json(books);
	} catch (error) {
		// manejo de errores
		res.status(500).json({ error: 'Error al filtrar libros.' });
	}
};

// Función manejadora -> Decide qué hacer basándose en si existe el query param
// Se necesita este tipo de función porque express trabaja en secuencia y no reconoce como distinta una ruta que tenga query params
// getAllBook -> '/books/'
// filterByAuthor -> '/books?author="Cortazar"'
// para express es la misma ruta, y va a redireccionar a la primera siempre

export const getBooks = (req: Request, res: Response): void => {
	const { author } = req.query; // obtener dato desde query.params

	if (author) {
		// Si hay autor -> la función de filtrado
		return filterByAuthor(req, res);
	} else {
		// Si no hay autor -> función de traer todos
		return getAllBooks(req, res);
	}
};
