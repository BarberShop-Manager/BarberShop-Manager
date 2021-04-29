const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// Model - cadastro
    const Cadhorario = new Schema({
        nome_do_funcionario:{
            type:String,
            require: true,
        },
        Selecionar_servico:{
            type: String,
            require: true,
        },
        data_do_servico:{
            type: Date,
            require: true,
            
        },
        horario:{
            type:Number,
            require: true,
        },
        pagamento:{
            type:String,
            require: true,
            default:"Dinheiro"
        },
        
        numero:{
            type:Number,
            require: true,
        },
        observações:{
            type: String
        }
    })
    
    
mongoose.model('cadhorario',Cadhorario)
    
// Collection

/*
const servico = mongoose.model('cadhorario')
*/

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

// Rota de consulta para a base de dados 
/* 
mongo
use banco
show collections 
db.cadhorarios.find()
*/