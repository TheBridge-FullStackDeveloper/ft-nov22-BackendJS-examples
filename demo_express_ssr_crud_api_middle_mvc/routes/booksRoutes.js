const express = require('express')
const booksRouter = express.Router();
const checkApiKey = require('../middlewares/auth_api_key')
const booksController = require ('../controllers/booksController')
// CRUD --> CREATE, READ, UPDATE, DELETE

// http://localhost:3000/books
// CREATE - crear un libroo

// JSON del libro a enviar a POST /books
/*
{
    "title": "Don Quijote de la Mancha",
    "year": 1605,
    "description": "En un lugar de la mancha..."
}
*/
booksRouter.post('/', checkApiKey, booksController.createBook)
// READ - leer un libro
booksRouter.get('/', booksController.getBook)
// UPDATE - actualizar un libro
booksRouter.put('/', checkApiKey, booksController.editBook)
// DELETE - Borrar un libro
booksRouter.delete('/', checkApiKey, booksController.deleteBook)

module.exports = booksRouter;
