const express = require("express");
const router = express.Router(); 
const sugSchema = require("../models/sugerencia");
const verifyToken = require('./validate_token');
const articuloController = require('../controllers/articuloController');

//El post lo hace SOLO el usuario
router.post("/sugerencias", articuloController.crearSugerencia);

//Peticiones del Admin
//CRUD de sugerencias
//Consultar 
router.get("/sugerencias/:_id",  verifyToken,(req, res) => {
    sugSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//eliminar
router.delete("/sugerencias/:_id",  verifyToken,(req, res) => {
    const { id } = req.params;
    sugSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});


module.exports = router;

