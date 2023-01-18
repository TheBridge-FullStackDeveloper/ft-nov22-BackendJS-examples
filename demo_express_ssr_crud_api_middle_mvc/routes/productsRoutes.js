const express = require('express')
const productsController = require("../controllers/productsController");

const productsRouter = express.Router();

// /products
// GET http://localhost:3000/products/3
// GET http://localhost:3000/products/4
// GET http://localhost:3000/products
// /products
productsRouter.get('/:id?',productsController.getProducts);

module.exports = productsRouter;
