//Carregando Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
const employee = require("./routes/employee");
const cliente = require("./routes/client");
const path = require("path");
<<<<<<< HEAD
const userNew = require("./models/ClienteNovo");
const session = require("express-session");
const flash = require('connect-flash');

let erros = [];

=======
const Sequelize  = require('sequelize');

require("./models/FuncionarioNovo")
>>>>>>> 533a3068418cbb599f767ad291f6d864bb12a41e
// CONFIGURAÇÕES
    // Sessão
        app.use(session({
            secret: "qualquer coisa",
            resave: true,
            saveUninitialized: true
        }))

        app.use(flash())
    
    //Middleware
        app.use((res, req, next) => {
               //res.locals.error = req.flash("error");
               //res.locals.success = req.flash("success");
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    //Handlebars
        app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
        app.set('view engine', 'handlebars');


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
            userNew.create({
                user_id: req.body.user_id,
                _name: req.body._name,
                _username: req.body._username,
                _email: req.body._email,
                _cpf: req.body._cpf,
                _date: req.body._date,
                _password: req.body._password,
                _telephone: req.body._telephone,
                _nivel: req.body._nivel
            }).then(function(){
                console.log("usuário cadastrado com sucesso");
                res.redirect('/')
            }).catch(function(erro){
                res.send("Ocorreu um erro " + erro)
            })
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