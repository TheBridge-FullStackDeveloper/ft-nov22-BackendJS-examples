/**
 * @author AlejandroReyes <alejandroreyespage.com> 
 * @exports routes 
 * @namespace routes 
 */

const entry = require('../models/entries'); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo

  /**
  * <pre>
  * GET http://localhost:3000/entries --> All
  * GET http://localhost:3000/entries?email=hola@gmail.com --> por email
  * </pre>
  * @memberof routes 
  * @method getEntries 
  * @async 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @return {json} objeto con todas las entries encontradas
  * @throws {error} 
  */

const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

module.exports = {
    getEntries,
    createEntry,
    //deleteEntry, --> DELETE
    //updateEntry --> PUT
}