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
        type: String,
        require: true

    },
    Hour_service:{
        type: String,
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
    }
    
})

mongoose.model("pagamento-cliente", Pagamento) 