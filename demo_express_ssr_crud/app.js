const express = require('express')
const cowsay = require('cowsay')
const fetch = require('node-fetch')

const calculator = require('./modules/calculator')
//import {  } from "module";

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Habilitar tipo de dato a recibir en el server
app.use(express.json()); 


app.get('/', (req, res) => {
    const calc = calculator.add(2, 2);
    //res.send(`Hello World! La suma es ${suma}`)
    res.render('content', { msj: "The Bridge", calc })
})

// http://localhost:3000/pokemon?a=1&b=2
// http://localhost:3000/pokemon
// http://localhost:3000/pokemon?aaaaaa=34
app.get('/pokemon', (req, res) => {
    console.log(req.query);
    const { a, b } = req.query; // Query params
    console.log(a, b)
    if (a && b) {
        const calc = calculator.sub(a, b);
        //res.send(`Ahí va pikachu! ${a}-${b} es ${resta}`)
        const msj2 = `de ${a}-${b}`
        // leer pokemons de la BBDD
        const pokemons = ['Bulbasur', 'Pikachu', 'Charmander', 'Ditto'];
        res.render('content', { msj: 'Ahí va pikachu!', msj2, calc, pokemons })
    }
    else {
        res.send(`Ahí va pikachu!`)
    }
})

app.get('/product', (req, res) => {
    res.send('Ahí va un producto')
})

// http://localhost:3000/product/1
// http://localhost:3000/product/3
// http://localhost:3000/product/6
// http://localhost:3000/product
app.get('/product/:id?', (req, res) => {
    console.log(req.params); // Params
    if (req.params.id) {
        // LLamadas a la BBDD 
        // para trar la noticia con ID adecuado
        res.send('Hey! te mando el producto número ' + req.params.id)
    }
    else {
        res.send('Ahí van los productos')
    }
})

app.get('/product/detail', (req, res) => {
    res.json({
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    })
})

// CRUD --> CREATE, READ, UPDATE, DELETE

// http://localhost:3000/books
// CREATE - crear un libro

// JSON del libro a enviar a POST /books
/*
{
    "title": "Don Quijote de la Mancha",
    "year": 1605,
    "description": "En un lugar de la mancha..."
}
*/
app.post('/books', (req, res) => {
    console.log("*******DATOS ENVIADOS*******");
    console.log(req.body);
    const {title} = req.body;
    res.status(201).json({msj:`Creado libro: ${title}`});
})
// READ - leer un libro
app.get('/books', (req, res) => {
    res.status(200).send("Has mandado un GET!");
})
// UPDATE - actualizar un libro
app.put('/books', (req, res) => {
    res.status(202).send("Has mandado un PUT!");
})
// DELETE - Borrar un libro
app.delete('/books', (req, res) => {
    res.status(202).send("Has mandado un DELETE!");
})

app.get('/first_template', function (req, res) {
    res.render('first_view');
});


// /products
// GET http://localhost:3000/products/3
// GET http://localhost:3000/products/4
// GET http://localhost:3000/products
app.get('/products/:id?', async (req, res) => {
    if (req.params.id) { // con ID
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.render('products', { "products": [products] }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else { // sin ID --> TODOS los products
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.render('products', { products }); // Pinta datos en el pug
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

// POST http://localhost:3000/products
app.post('/products', async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas
    // para guardar 
    // en una BBDD SQL o MongoDB

    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api",answer);

    res.status(201).json({msj:`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`});
});



app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e: "oO",
            T: "U "
        }))
})