const express = require("express");
const router = express.Router(); //manejador de rutas de express
const capituloSchema = require("../models/capitulo");
const verifyToken = require('./validate_token');

//Admin
router.post("/capitulos", verifyToken, (req, res) => {
    const capitulo = capituloSchema(req.body);
    capitulo
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Actualiza un capitulo buscado por el numero del capitulo
router.put("/capitulos/:numeroCap", verifyToken, (req, res) => {
    const { numeroCap } = req.params;
    const { titulo, numeroArticulos, fecha } = req.body;
    capituloSchema.updateOne({ numeroCap: numeroCap }, {
        $set: { numeroCap, titulo, numeroArticulos, fecha }
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//elimina el capitulo por id
router.delete("/capitulos/:id",verifyToken, (req, res) => {
    const { id } = req.params;
    capituloSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

//Peticiones del usuario

//Busca todos los capitulos con sus respectivos articulos
router.get("/capitulos", (req, res) => {
    capituloSchema.find().populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.get("/capitulos/:numeroCap", (req, res) => {
    capituloSchema.find().populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/capitulos/:id", (req, res) => {
    capituloSchema.findOne( { _id: req.params.id }).populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Busca todos los capitulos por palabra clave
router.get("/capitulos/buscar/:palabraClave", verifyToken, (req, res) => {
    capituloSchema.find({ palabrasClave: { $in: [req.params.palabraClave] } }).populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

module.exports = router;
