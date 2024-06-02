const express = require("express");
const verifyToken = require('./validate_token');
const router = express.Router(); //manejador de rutas de express
const ArticuloSchema = require("../models/articulo");
const articuloController = require('../controllers/articuloController');

//Admin
router.post('/articulo', verifyToken ,articuloController.crearArticulo);

//Actualiza un articulo buscado por el ID
router.put("/articulo/:id/change", verifyToken,(req, res) => {
    ArticuloSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Buscar un artículo por su título
router.put("/articulo/:titulo/change", verifyToken,(req, res) => {
    ArticuloSchema.findOneAndUpdate({ titulo: req.params.titulo }, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Buscar un artículo por su número de artículo
router.put("/articulo/:numeroArticulo/change", verifyToken,(req, res) => {
    ArticuloSchema.findOneAndUpdate({ numeroArticulo: req.params.numeroArticulo }, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Elimina el articulo buscado por el ID
router.delete("/articulo/delete/:id", verifyToken, (req, res) => {
    ArticuloSchema.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Peticiones del usuario

// Buscar un artículo por su título
router.get("/articulo/:titulo",(req, res) => {
    ArticuloSchema.findOne({ titulo: req.params.titulo })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Buscar un artículo por su número de artículo
router.get("/articulo/numero/:numeroArticulo", (req, res) => {
    ArticuloSchema.findOne({ numeroArticulo: req.params.numeroArticulo })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Buscar todos los articulos
router.get("/articulos", (req, res) => {
    ArticuloSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

module.exports = router;