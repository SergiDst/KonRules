const mongoose = require("mongoose"); // importando el componente mogoose
const capSchema = mongoose.Schema({
    numeroCap: {
        type: Number,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    numeroArticulos: {
        type: Number,
        required: true,
    },
    palabrasClave: {
        type: [String],
        requiered: true,
    },
    articulos: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Articulo'}],
    },
});
module.exports = mongoose.model("Capitulo", capSchema);