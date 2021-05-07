const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
    nome: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: false
    },
    dataNasc: {
        type: String,
        required: false
    },
    senha: {
        type: String,
        required: true
    },
    tele: {
        type: String,
        required: false
    },
    nivel: {
        type: Number,
        default: 2
    }
});

mongoose.model("clientes", newUser);
