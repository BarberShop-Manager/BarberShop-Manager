const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Administrador = new Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        default: 0
    }
})

mongoose.model("administradores", Administrador)
