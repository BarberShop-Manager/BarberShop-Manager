//Carregando Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
const employee = require("./routes/employee");
const cliente = require("./routes/client");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

//const Sequelize = require('sequelize');
// CONFIGURAÇÕES
//Sessão
app.use(session({
    secret: "barbershopmanager",
    resave: true,
    saveUninitialized: true
}));
app.use(flash())
//Midleware
app.use((req, res, next) => {
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
mongoose.connect('mongodb://localhost/barbershop').then(() => {
    console.log("Conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao se conectar" + err)
})
//Sequelize
/* 
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
*/


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

app.post('/cadastro/novo', (req, res) => {
    res.render("novo")
})

//Login dos Usuários
app.get('/login', (req, res) => {
    res.render("login")
});

//Rotas do Adminstrador
app.use('/admin', admin);

//Rotas do Funcionários
app.use('/funcionario', employee);

//Rotas do Cliente
app.use('/cliente', cliente);

//OUTRAS CONFIGURAÇÕES
const PORT = 3308;
app.listen(PORT, () => {
    console.log(`Barbearia rodando no seguinte servidor: http://localhost:${PORT}`)
})