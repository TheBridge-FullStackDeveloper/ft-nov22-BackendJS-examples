const express = require('express')
const fetch = require('node-fetch')
const checkApiKey = require('../middlewares/auth_api_key')

const productsApiRouter = express.Router();

// Rutas de API de productos

// GET http://localhost:3000/api/products/3
// GET http://localhost:3000/api/products/4
// GET http://localhost:3000/api/products
productsApiRouter.get('/:id?', async (req, res) => {
    if (req.params.id) { // con ID
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else { // sin ID --> TODOS los products
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.status(200).json(products); // Respuesta de la API para muchos productos
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
});


/*Objeto de prueba para crear*/
/*
{
    "title": "Barritas de tomate",
    "price": 1.2,
    "description": "Your perfect barrita de tomate in plaza mayor",
    "category": "food",
    "image": "https://estoyhechouncocinillas.com/wp-content/uploads/2015/08/tostadas_con_tomate.png"
}
*/

// POST http://localhost:3000/api/products
productsApiRouter.post('/', checkApiKey, async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas
    // para guardar 
    // en una BBDD SQL o MongoDB

    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'productsApiRouterlication/json',
            'Content-Type': 'productsApiRouterlication/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api", answer);

    res.status(201).json({
        msj: `Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`,
        "product": answer
    });
});

module.exports = productsApiRouter;
