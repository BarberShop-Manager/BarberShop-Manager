//Carregando Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
const employee = require("./routes/employee");
const cliente = require("./routes/cliente");
const path = require("path");
const mongoose = require("mongoose")
// CONFIGURAÇÕES
    //Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    //Handlebars
        app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
        app.set('view engine', 'handlebars');
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/barberdb").then(()=>{
            console.log("Conectado ao Mongo")
        }).catch((err)=>{
            console.log("Erro ao se conectar com o Mongo: "+err)
        })   


    //Public
        app.use(express.static(path.join(__dirname, "public")))
//ROTAS

    //Rota Principal
        app.get('/', (req, res) => {
            res.render("index")
        });

    //Cadatro do Cliente
        app.get('/cadastro', (req, res) => {
            res.render("cadastro-cliente")
        });

        app.post('/cadastro/novo',(req,res)=>{
            res.render("novo")
        })

    //Login dos Usuários
        app.get('/login', (req, res) => {
            res.render("login")
        });

    //Rotas do Adminstrador
        app.use('/administrador', admin);

    //Rotas do Funcionários
        app.use('/funcionario', employee);

    //Rotas do Cliente
        app.use('/cliente', cliente);

//OUTRAS CONFIGURAÇÕES
    const PORT = 3308;
    app.listen(PORT, () => {
        console.log("Barbearia Aberta !")
    })