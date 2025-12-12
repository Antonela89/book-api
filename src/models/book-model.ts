// importacion de modulos
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
		return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	}

	// get -> traer un libro por id
	static getBookByID(id: number): Book | undefined {
		const data = this.getAllBooks();

		return data.find((book) => book.id === id);
	}

	static postBook(newBook: Book): Book {
		const data = this.getAllBooks();

		// crear id autoincremental
		const maxID = data.length > 0 ? Math.max(...data.map(b => b.id)) + 1 : 1;
		const newID = maxID + 1;

		const book = { ...newBook, id: newID };

		data.push(book);

		saveData(data);

		return book;
	}

	// put -> actualizar un libro por id
	static updateBook(id: number, updatBook: Partial<Book>): Book | null {
		const data = this.getAllBooks();

		const index = data.findIndex((book) => book.id === id);

		if (index === -1) return null;

		const findedBook = data[index];
		const mergedBook = { ...findedBook, ...updatBook } as Book;

		data[index] = mergedBook;

		saveData(data);

		return mergedBook;
	}

	// delete -> borrar un libro por id
	static deleteBook(id: number): boolean {
		const data = this.getAllBooks();

		const index = data.findIndex((book) => book.id === id);

		if (index === -1) return false;

		data.splice(index, 1);

		saveData(data);
		return true;
	}

	static findByAuthor(query: string): Book[] {
		const data = this.getAllBooks();

		const results = data.filter((book) =>
			book.author.toLowerCase().includes(query.toLowerCase())
		);

		if (results.length === 0) return [];

		return results;
	}
}
