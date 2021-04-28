const mongoose = require("mongoose")


// Configurando o mongoose
    mongoose.Promisse = global.Promise;
    mongoose.connect("mongodb://localhost/banco",{
        useMongoClient: true
    }).then(function(){
        console.log("MongoDb Conectado")
    }).catch(function(err){
        console.log("Erro ao se conectar a base de dados: "+err)
    })

// Model - cadastro
    const servicocad = mongoose.Schema({
        nome_do_funcionario:{
            type:String,
            require: true,
        },
        Selecionar_servico:{
            type: String,
            require: true,
        },
        data_do_servico:{
            type:Date,
            require: true,
            
        },
        horario:{
            type:Date,
            require: true,
        },
        pagamento:{
            type:String,
            require: true,
        },
        numero:{
            type:Number,
            require: true,
        },
        observações:{
            type: String
        }
    })

mongoose.model('cad-horario',servicocad)