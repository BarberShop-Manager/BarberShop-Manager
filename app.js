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
    const flash = require("connect-flash");
    const session = require("express-session");
    const passport = require("passport")
    require("./config/auth")(passport);   
    
// CONFIGURAÇÕES
    // Sessão
        app.use(session({
            secret: "Uma barberada",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())
        
        app.use(flash())

    
    //Middleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
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
    
    //Login dos Usuários
        app.get('/login', (req, res) => {
            res.render("login")
        });

        app.post("/login", (req, res, next) =>{
            passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/login",
                failureFlash: true
            })(req, res, next)
        })

        app.get("/logout", (req,res) => {
            req.session.destroy((err) => {
                res.redirect('/') // will always fire after session is destroyed
            })
        })

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