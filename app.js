//Carregando Módulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const mongoose = require("mongoose");
    const app = express();
    const admin = require("./routes/admin");
    const employee = require("./routes/employee");
    const cliente = require("./routes/client");
    const path = require("path");
    require("./models/ClienteNovo");
    const flash = require("connect-flash");
    const session = require("express-session");
    const Client = mongoose.model("clientes");
    
// CONFIGURAÇÕES
    // Sessão
        app.use(session({
            secret: "qualquer coisa",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    
    //Middleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
        
    //Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    //Handlebars
        app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
        app.set('view engine', 'handlebars');
    
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/db_bsm", {
            useNewUrlParser:true, useUnifiedTopology: true
        }).then(function() {
            console.log("Barbearia Conectada...")
        }).catch(function(err){
            console.log("Houve um erro ao se conectar a Barbearia, erro: "+ err);
        });

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
    
    app.post('/cadastro/users/new-user',(req,res)=>{
        
        let erros = [];

        if(!req.body._nome || typeof req.body._nome == undefined || req.body._nome == null){

        }

        if(!req.body._username || typeof req.body._username == undefined || req.body._username == null){

        }
        if(!req.body._email || typeof req.body._email == undefined || req.body._email == null){

        }

        if(!req.body._cpf || typeof req.body._cpf == undefined || req.body._cpf == null){

        }

        if(!req.body._password || typeof req.body._password == undefined || req.body._password == null){

        }
        
        const novoCliente = {
                _name:req.body._name,
                _username:req.body._username,
                _email:req.body._email,
                _cpf:req.body._cpf,
                _date:req.body._date,
                _password:req.body._password,
                _telephone:req.body._telephone,
                _nivel:req.body._nivel
            }
        
        new Cliente(novoCliente).save().then(()=>{
                console.log("Usuário cadastrado com sucesso");
            }).catch((err)=>{
                console.log("Erro ao cadastrar o usuario "+ err);
        });
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

//OUTRAS CONFIGURAÇÕESs
    const PORT = 3308;
    app.listen(PORT, () => {
        console.log("Barbearia Aberta !")
    })