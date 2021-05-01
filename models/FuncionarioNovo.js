const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const FuncionarioNovo = new Schema({
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
        type: String,
        required: true
    },
    diasDeTrabalho: {
        type: Array,
    },
    dasHora: {
        type: String,
        required: true
    },
    ateHora: {
        type: String,
        required: true
    },

    dataNasc: {
        type: String,
    },

    senha: {
        type: String,
        required: true
    }
})

mongoose.model("FuncionariosNovos", FuncionarioNovo)