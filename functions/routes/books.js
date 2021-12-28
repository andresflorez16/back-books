const { Router } = require('express');
const router = Router();
const {getBook, getBooks, addBooks, updateBooks, deleteBooks } = require('../controllers/books.controller')

router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books/add', addBooks);
router.delete('/books/:id', deleteBooks);
router.put('/books/:id', updateBooks);

module.exports = router;    