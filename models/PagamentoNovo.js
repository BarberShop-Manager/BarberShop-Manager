const { ObjectID } = require("bson");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Model pagamento cliente
const Pagamento = new Schema({           
    Name_client:{
        type: String,
        require: true
    },
    Service:{
        type: String,
        require: true
    },
    Data_service:{
        type: Date,
        require: true
    },
    Hour_service:{
        type: Date,
        require: true
    },
    Payment_form:{
        type: String,
        require: true
    },
    Value:{
        type: Number,
        require: true
    },
    Observ:{
        type: String,               
        require: false
    },
    id_funcionario:{
        type: Schema.Types.ObjectID,
        ref: "cadhorario",
        required: true
    }
})

mongoose.model("pagamento-cliente", Pagamento) 