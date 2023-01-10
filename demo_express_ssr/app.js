const express = require('express')
const cowsay = require('cowsay')
const calculator = require('./modules/calculator')
//import {  } from "module";

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views','./views');


app.get('/', (req, res) => {
    const calc = calculator.add(2,2);
    //res.send(`Hello World! La suma es ${suma}`)
    res.render('content',{msj:"The Bridge",calc})
})

// http://localhost:3000/pokemon?a=1&b=2
// http://localhost:3000/pokemon
// http://localhost:3000/pokemon?aaaaaa=34
app.get('/pokemon', (req, res) => {
    console.log(req.query);
    const {a,b} = req.query;
    console.log(a,b)
    if(a && b){
        const calc = calculator.sub(a,b);
        //res.send(`Ahí va pikachu! ${a}-${b} es ${resta}`)
        const msj2 = `de ${a}-${b}`
        // leer pokemons de la BBDD
        const pokemons = ['Bulbasur','Pikachu','Charmander','Ditto'];
        res.render('content',{msj:'Ahí va pikachu!',msj2, calc, pokemons})
    }
    else{
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

/*
app.post("/books",(req,res)=>{})
app.delete("/books",(req,res)=>{})
*/

app.get('/first_template', function(req, res){
    res.render('first_view');
});
 



app.listen(port, () => {
    console.log(
        cowsay.say({
            text : `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e : "oO",
            T : "U "
        }))
})