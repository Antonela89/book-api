import { Router } from "express";
import { getBooks, getBookByID, postBook, updatedBook, deleteBook } from "../controllers/book-controller";
import { validateIdParam } from "../middlewares/validatedID";
import { validateBookBody, validateBookUpdate } from "../middlewares/validationBook";

const router: Router = Router();

// Rutas especificas primero (con ID)
router.get('/:id', validateIdParam, getBookByID);
router.put('/:id', validateIdParam, validateBookUpdate, updatedBook);
router.delete('/:id', validateIdParam, deleteBook);

router.get('/', getBooks); //-> tiene la logica para decidir si hace getAllBooks o filterByAuthor
router.post('/', validateBookBody, postBook);


export default router;