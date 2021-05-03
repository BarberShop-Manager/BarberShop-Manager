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

require("./models/ClienteNovo");
const Client = mongoose.model("clientes");

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
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars

const hbs = handlebars.create({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    //Criando um helper handlebars customizável

    helpers: {
        nivel: function (user) {
            return user.nivel
        },
        ifCond: function ( a,b, opts) {
            if(a == b)
            return opts.fn(this);
        else
            return opts.inverse(this);
        }
    }
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/db_bsm", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(function () {
    console.log("BaberShop Manager conectado ao banco de dados mongo.")
}).catch(function (err) {
    console.log("Houve um erro ao conectar o BarberShop Manager ao bando de dados mongo, erro: " + err);
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

// app.post('/login', (req, res, next) => {

//     passport.authenticate(["local-user","local-func"], {
//         successRedirect: "/cliente",
//         failureRedirect: "/login",
//         failureFlash: true
//     })(req, res, next)

// })


app.post('/login',
    passport.authenticate(['local-func','local-user'], {
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res, next) {
        if (req.user.nivel == 0) {
            res.redirect('/admin');
        } else if (req.user.nivel == 1) {
            res.redirect('/funcionario');
        } else if (req.user.nivel == 2) {
            res.redirect('/cliente');
        }
        next();
    })


app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

//Rotas do Adminstrador
app.use('/admin', admin);

//Rotas do Funcionários
app.use('/funcionario', employee);

//Rotas do Cliente
app.use('/cliente', cliente);

//OUTRAS CONFIGURAÇÕES
const PORT = 3308;
app.listen(PORT, () => {
    console.log(`BarberShop Manager rodando no seguinte servidor local: http://localhost:${PORT}`)
})