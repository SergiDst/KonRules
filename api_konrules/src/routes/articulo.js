const express = require("express");
const verifyToken = require('./validate_token');
const router = express.Router(); //manejador de rutas de express
const ArticuloSchema = require("../models/articulo");
const Capitulo = require("../models/capitulo")
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
router.put("/articulo/:numeroArticulo",(req, res) => {
    ArticuloSchema.findOneAndUpdate({ numeroArticulo: req.params.numeroArticulo }, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Elimina el articulo buscado por el ID
router.delete("/articulo/:numeroArticulo", verifyToken, (req, res) => {
  const { numeroArticulo } = req.params;

  // Si el middleware de verificación de token llega aquí sin lanzar un error, significa que el token es válido
  // Puedes proceder con la eliminación del capítulo

  ArticuloSchema.findOneAndDelete({ numeroArticulo: numeroArticulo })
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

router.get('/articulos/:numeroCap', async function(req, res) {
    var numeroCap = req.params.numeroCap;
    try {
      let capitulos = await Capitulo
        .find({ numeroCap: numeroCap })
        .populate('articulos')
        .exec();
      // Extrae solo los artículos de los capítulos
      var articulos = capitulos.map(function(capitulo) {
        return capitulo.articulos;
      });
      res.json(articulos);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.get('/articulo/:numeroArticulo', async function(req, res) {
    var numeroArticulo = req.params.numeroArticulo;
    try {
      // Busca el artículo basado en el número del artículo
      let articulo = await Articulo
        .findOne({ numeroArticulo: numeroArticulo })
        .exec();
  
      // Si el artículo no existe, devuelve un error
      if (!articulo) {
        return res.status(404).send('Artículo no encontrado');
      }
  
      // Usa la función de agregación para buscar el capítulo que contiene el artículo
      let capitulos = await Capitulo.aggregate([
        { $unwind: "$articulos" },
        { $match: { "articulos": mongoose.Types.ObjectId(articulo._id) } }
      ]);
  
      // Si no se encontró ningún capítulo, devuelve un error
      if (capitulos.length === 0) {
        return res.status(404).send('Capítulo no encontrado');
      }
  
      // Devuelve el nombre del primer capítulo encontrado
      res.json({ nombreCapitulo: capitulos[0].titulo });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  
  


module.exports = router;