// importacion de modulos para trabajar con archivos
import fs from 'fs';
import path from 'path';

// ruta de la "base de datos"
const filePath = path.join(__dirname, '../database/book.json');

// creacion de interface para asegurar tipo Book
interface Book {
	id: number;
	title: string;
	author: string;
	genre: string;
	year: number;
	pages: number;
	stock: number;
}

// metodo auxiliar de guardado
const saveData = (data: Book[]): void => {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// encapsulamiento de metodos
export class BookModel {
	// creacion de metodos
	// get -> traer todos los libros
	static getAllBooks(): Book[] {
		// leer el archivo json y devolver la lista
		return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	}

	// get -> traer un libro por id
	static getBookByID(id: number): Book | undefined {
		// obtener todos los libros
		const data = this.getAllBooks();

		// encotnrar por id y devolver
		return data.find((book) => book.id === id);
	}

	// post -> crear un libro
	static postBook(newBook: Book): Book {
		// obtener todos los libros
		const data = this.getAllBooks();

		// crear id autoincremental
		const maxID = data.length > 0 ? Math.max(...data.map(b => b.id)) : 1;
		const newID = maxID + 1;

		// crear el libro: informacion brindada por usuario + id generado automaticamente
		const book = { ...newBook, id: newID };

		// agregar libro nuevo
		data.push(book);

		// guardar listado actualizado
		saveData(data);

		// devolver libro creado
		return book;
	}

	// put -> actualizar un libro por id
	static updateBook(id: number, updatBook: Partial<Book>): Book | null {
		// obtener todos los libros
		const data = this.getAllBooks();

		// buscar por indice segun el id
		const index = data.findIndex((book) => book.id === id);

		// si no se encontro
		if (index === -1) return null;

		// buscar el libro a editar por indice encontrado
		const findedBook = data[index];
		// unir los cambios
		const mergedBook = { ...findedBook, ...updatBook } as Book;

		// guardar libro editado 
		data[index] = mergedBook;

		// guardar informacion
		saveData(data);

		// devolver el libro editado
		return mergedBook;
	}

	// delete -> borrar un libro por id
	static deleteBook(id: number): boolean {
		// obtener todos los libros
		const data = this.getAllBooks();

		// encontrar por indice y id
		const index = data.findIndex((book) => book.id === id);

		// si no encuentra libro, devolver falso
		if (index === -1) return false;

		// quitar el libro a eliminar de la lista
		data.splice(index, 1);

		// guardar el listado actualizado
		saveData(data);
		// devolver verdadedo
		return true;
	}

	// get -> buscar libros por autor
	static findByAuthor(query: string): Book[] {
		// obtener todos los libros
		const data = this.getAllBooks();

		// filtrar resultados
		const results = data.filter((book) =>
			book.author.toLowerCase().includes(query.toLowerCase())
		);

		// si resultados da 0
		if (results.length === 0) return [];

		// devolver resultados
		return results;
	}
}
