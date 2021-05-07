const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model - cadastro
    const Cadhorario = new Schema({
        nome_do_funcionario:{
            type:String,
            require: true,
        },
        nome_do_cliente:{
            type:String,
            require: true,
        },
        Selecionar_servico:{
            type: String,
            require: true,
        },
        data_do_servico:{
            type: String,
            require: true,
            
        },
        horario:{
            type:String,
            require: true,
        },
        pagamento:{
            type:String,
            require: true,
            default:"Dinheiro"
        },
        
        numero:{
            type:String,
            require: true,
        },
        observações:{
            type: String
        }
    })
    
    
mongoose.model('cadhorario',Cadhorario)
    
