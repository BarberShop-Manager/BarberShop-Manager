const mongoose = require("mongoose")


// Configurando o mongoose
    mongoose.Promisse = global.Promise;
    
    mongoose.connect("mongodb://localhost/banco",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(function(){
        console.log("MongoDb Conectado")
    }).catch(function(err){
        console.log("Erro ao se conectar a base de dados: "+err)
    })

// Model - cadastro
    const servicoSchema = mongoose.Schema({
        nome_do_funcionario:{
            type:String,
            require: true,
        },
        Selecionar_servico:{
            type: String,
            require: true,
        },
        data_do_servico:{
            type: Number,
            require: true,
            
        },
        horario:{
            type:Number,
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


// Collection

mongoose.model('cadhorario',servicoSchema)

const servico = mongoose.model('cadhorario')

/*
new servico({
    nome_do_funcionario:'Pedro Vitor',
    Selecionar_servico:'Degrade',
    data_do_servico:'28',
    horario:'15',
    pagamento:'Cartão',
    numero:'62995205598',
    observações:''
}).save().then(()=>{
    console.log("Usuário criado com sucesso!")
}).catch((err)=>{
    console.log("Erro ao registra corte" +err)
})
*/
