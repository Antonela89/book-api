import { Router } from "express"; // importar router
// importar controladores
import { getBooks, getBookByID, postBook, updatedBook, deleteBook } from "../controllers/book-controller";
// impotar middlewares
import { validateIdParam } from "../middlewares/validatedID";
import { validateBookBody, validateBookUpdate } from "../middlewares/validationBook";

// instancia de router
const router: Router = Router();

// Rutas especificas primero (con ID)
router.get('/:id', validateIdParam, getBookByID); // libro por id
router.put('/:id', validateIdParam, validateBookUpdate, updatedBook); // editar libro
router.delete('/:id', validateIdParam, deleteBook); // eliminar libro

router.get('/', getBooks); //-> tiene la logica para decidir si hace getAllBooks o filterByAuthor
router.post('/', validateBookBody, postBook); // crear libro

export default router; // exportar