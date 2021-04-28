const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema ({
    _name: {
        type: String,
        required:true
    },
    _username: {
        type:String,
        required:true
    },
    _email: {
        type:String,
        required:true
    },
    _cpf: {
        type: Number,
        required: false
    },
    _date: {
        type: String,
        required: false
    },
    _password: {
        type: String,
        required: true
    },
    _telephone: {
        type: Number,
        required: false
    },
    _nivel: {
        type: Number,
        default: 2
    }
});

mongoose.model("clientes", newUser);