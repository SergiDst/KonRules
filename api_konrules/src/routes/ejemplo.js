const express = require("express");
const router = express.Router(); //manejador de rutas de express
const ejemploSchema = require("../models/ejemplo");
const verifyToken = require('./validate_token');
const articuloController = require('../controllers/articuloController');
const Articulo = require('../models/articulo')
const Capitulo = require('../models/capitulo')


//Admin 
// router.post("/ejemplos", articuloController.crearEjemplo);

router.post('/ejemplos', async (req, res) => {
    const { title, descripcion, numeroArticulo, image } = req.body;

    try {
        // Validar la solicitud
        if (!title || !descripcion || !numeroArticulo || !image) {
            return res.status(400).send({ message: 'Todos los campos son obligatorios' });
        }

        // Crear un nuevo ejemplo
        const example = new ejemploSchema({ title, descripcion, image });
        await example.save();

        // Buscar el artículo por su número
        const article = await Articulo.findOne({ numeroArticulo });

        if (!article) {
            return res.status(404).send({ message: 'Artículo no encontrado' });
        }

        // Buscar el capítulo que contiene el artículo
        const chapter = await Capitulo.findOne({ articulos: article._id });

        if (!chapter) {
            return res.status(404).send({ message: 'Capítulo no encontrado' });
        }

        // Actualizar todos los artículos relacionados dentro del mismo capítulo
        const relatedArticles = await Articulo.find({ _id: { $in: chapter.articulos } });

        for (let relatedArticle of relatedArticles) {
            relatedArticle.Ejemplos.push(example._id);
            await relatedArticle.save();
        }

        // Enviar respuesta exitosa
        res.status(201).send(example);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear el ejemplo', error });
    }
});

router.put('/ejemplos/:numeroArticulo', async (req, res) => {
    const numeroArticulo = parseInt(req.params.numeroArticulo);
    const { title, descripcion, image } = req.body;

    try {
        // 1. Buscar el artículo con el número de artículo proporcionado
        const articulo = await Articulo.findOne({ numeroArticulo });

        if (!articulo) {
            return res.status(404).send({ message: 'Artículo no encontrado' });
        }

        // 2. Buscar el capítulo al que pertenece el artículo
        const capitulo = await Capitulo.findOne({ articulos: articulo._id });

        if (!capitulo) {
            return res.status(404).send({ message: 'Capítulo no encontrado' });
        }

        // 3. Obtener todos los artículos del mismo capítulo
        const articulosMismoCapitulo = await Articulo.find({ _id: { $in: capitulo.articulos } });

        // 4. Actualizar los campos de los ejemplos en cada artículo
        for (const art of articulosMismoCapitulo) {
            art.ejemplos.forEach(ejemplo => {
                if (title !== undefined) ejemplo.title = title;
                if (descripcion !== undefined) ejemplo.descripcion = descripcion;
                if (image !== undefined) ejemplo.image = image;
            });
            await art.save();
        }

        // 5. Responder con los ejemplos actualizados
        res.status(200).send(articulosMismoCapitulo.map(articulo => articulo.ejemplos));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar los ejemplos', error });
    }
});


router.delete('/ejemplos/:title', async (req, res) => {
    const title = req.params.title;
  
    try {
      // Buscar y eliminar el ejemplo por título
      await ejemploSchema.findOneAndDelete({ title });
      res.status(200).send('Ejemplo eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el ejemplo:', error);
      res.status(500).send('Error al eliminar el ejemplo');
    }
  });

router.get('/ejemplos', async (req, res) => {
    try {
      // Aquí puedes escribir el código para obtener todos los ejemplos de tu base de datos
      // Por ejemplo, si estás usando Mongoose, podrías hacer algo como esto:
      const ejemplos = await ejemploSchema.find();
      res.json(ejemplos);
    } catch (error) {
      console.error('Error al obtener ejemplos:', error);
      res.status(500).json({ error: 'Error al obtener ejemplos' });
    }
  });



//Elimina el ejemplo buscado por el ID
router.put("/ejemplo/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { title, image, video } = req.body;
    ejemploSchema
        .updateOne({ _id: id }, {
            $set: {title, image, video}
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//peticion del usuario

//Buscar un ejemplo por titulo
router.get("/ejemplo/:title", (req, res) => {
    ejemploSchema.findOne({ title: req.params.title })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Buscar un ejemplo por idArticulo al que pertenece
router.get("/ejemplos/:numeroArticulo", (req, res) => {
    ejemploSchema.findOne({ idArticulo: req.params.idArticulo })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Buscar todos los ejemplos por idArticulo al que pertenece
router.get("/ejemplos/:idArticulo", (req, res) => {
    ejemploSchema.find({ idArticulo: req.params.idArticulo })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

//Buscar todos los ejemplos
router.get("/ejemplos", (req, res) => {
    ejemploSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

module.exports = router;