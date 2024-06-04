// Primero, importa los modelos
const capitulo = require('../models/capitulo');
const articulo = require('../models/articulo');

// Luego, crea el controlador
exports.crearArticulo = async function(req, res) {
  // Obtiene el numeroCap del cuerpo de la solicitud
  const { numeroCap, numeroArticulo, titulo, contenido } = req.body;

  try {
    // Busca el capítulo por su número
    const BusCap = await capitulo.findOne({ numeroCap: numeroCap });

    // Si el capítulo no se encuentra, devuelve un error
    if (!BusCap) {
      return res.status(404).send('Capitulo no encontrado');
    }

    // Una vez que tienes el capítulo, puedes crear el artículo
    const nuevoArticulo = new articulo({
      idCapitulo: BusCap._id,
      numeroArticulo: numeroArticulo,
      titulo: titulo,
      contenido: contenido,
    });

    // Guarda el artículo
    const articuloGuardado = await nuevoArticulo.save();

    // Actualiza el capítulo para incluir el _id del nuevo artículo en el array de articulos
    BusCap.articulos.push(articuloGuardado._id);
    await BusCap.save();

    res.status(200).send('Articulo guardado exitosamente!');
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(400).json({ mensaje: 'Error de validación: ' + err.message });
    } else {
      res.status(500).json({ mensaje: 'Hubo un error al guardar el artículo', error: err });
    }
  }
  
};


//ejemplo

// Primero, importa los modelos
const Ejemplo = require('../models/ejemplo');

// Luego, crea el controlador
exports.crearEjemplo = async function(req, res) {
  // Obtiene el numeroArticulo del cuerpo de la solicitud
  const { numeroArticulo, title, image, video, descripcion } = req.body;

  try {
    // Busca el artículo por su número
    const BusArt = await articulo.findOne({ numeroArticulo: numeroArticulo });

    // Si el artículo no se encuentra, devuelve un error
    if (!BusArt) {
      return res.status(404).send('Articulo no encontrado');
    }

    // Una vez que tienes el artículo, puedes crear el ejemplo
    const nuevoEjemplo = new Ejemplo({
      idArticulo: BusArt._id,
      title: title,
      image: image,
      video: video,
      descripcion: descripcion
    });

    // Guarda el ejemplo
    const ejemploGuardado = await nuevoEjemplo.save();

    // Actualiza el artículo para incluir el _id del nuevo ejemplo en el array de Ejemplos
    BusArt.Ejemplos.push(ejemploGuardado._id);
    await BusArt.save();

    res.status(200).send('Ejemplo guardado exitosamente!');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//sugerencia

// Primero, importa los modelos
const Sugerencia = require('../models/sugerencia');
exports.crearSugerencia = async function(req, res) {
  // Obtiene los datos del cuerpo de la solicitud
  const { title, fecha, sugerencia, categoria } = req.body;

  try {
    // Busca el ejemplo por su título
    const ejemploEncontrado = await Ejemplo.findOne({ title: title });

    // Si el ejemplo no se encuentra, devuelve un error
    if (!ejemploEncontrado) {
      return res.status(404).send('Ejemplo no encontrado');
    }

    // Una vez que tienes el ejemplo, puedes crear la sugerencia
    const nuevaSugerencia = new Sugerencia({
      idEjemplo: ejemploEncontrado._id,
      fecha: fecha,
      sugerencia: sugerencia,
      categoria: categoria,
    });

    // Guarda la sugerencia
    const sugerenciaGuardada = await nuevaSugerencia.save();

    // Actualiza el ejemplo para incluir el _id de la nueva sugerencia en el array de Sugerencias
    ejemploEncontrado.sugerencias.push(sugerenciaGuardada._id);
    await ejemploEncontrado.save();

    res.status(200).send('Sugerencia guardada exitosamente!');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}


