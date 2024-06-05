const express = require("express");
const router = express.Router(); //manejador de rutas de express
const capituloSchema = require("../models/capitulo");
const verifyToken = require('./validate_token');
const mongoose = require('mongoose');

//Admin
router.post("/capitulos", verifyToken, (req, res) => {
    const capitulo = capituloSchema(req.body);
    capitulo
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Actualiza un capitulo buscado por el numero del capitulo
router.put("/capitulos/:numeroCap", (req, res) => {
    const { numeroCap } = req.params;
    const { titulo, numeroArticulos, palabrasClave } = req.body;
    capituloSchema.updateOne({ numeroCap: numeroCap }, {
        $set: { numeroCap, titulo, numeroArticulos, palabrasClave }
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//elimina el capitulo por id
router.delete("/capitulos/:numeroCap", verifyToken, (req, res) => {
    const { numeroCap } = req.params;

    // Si el middleware de verificación de token llega aquí sin lanzar un error, significa que el token es válido
    // Puedes proceder con la eliminación del capítulo

    capituloSchema.findOneAndDelete({ numeroCap: numeroCap })
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: "Capítulo no encontrado" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error al eliminar el capítulo", error });
        });
});


//Peticiones del usuario

//Busca todos los capitulos con sus respectivos articulos
router.get("/capitulos", (req, res) => {
    capituloSchema.find().populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


//Busca todos los capitulos por palabra clave
router.get("/capitulos/buscar/:palabraClave", verifyToken, (req, res) => {
    capituloSchema.find({ palabrasClave: { $in: [req.params.palabraClave] } }).populate('articulos')
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
router.get('/capitulos/:numeroCap', async (req, res) => {
    try {
      const capitulo = await capituloSchema.findOne({ numeroCap: req.params.numeroCap }).populate('articulos');
      res.json(capitulo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
    
  
  

module.exports = router;

