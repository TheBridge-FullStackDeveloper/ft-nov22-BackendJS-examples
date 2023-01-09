const express = require('express')
const cowsay = require('cowsay')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/pokemon', (req, res) => {
    res.send('Ahí va pikachu!')
})

app.get('/product', (req, res) => {
    res.send('Ahí va un producto')
})

// http://localhost:3000/product/1
// http://localhost:3000/product/3
// http://localhost:3000/product/6
// http://localhost:3000/product
app.get('/product/:id?', (req, res) => {
    console.log(req.params);
    if (req.params.id) {
        // LLamadas a la BBDD 
        // para trar la noticia con ID adecuado
        res.send('Hey! te mando el producto número '+req.params.id)
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


app.listen(port, () => {
    console.log(
        cowsay.say({
            text : `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e : "oO",
            T : "U "
        }))
})