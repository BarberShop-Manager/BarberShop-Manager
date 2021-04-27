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
const Sequelize = require('sequelize');
// CONFIGURAÇÕES
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//Sequelize
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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

app.post('/cadastro/novo', (req, res) => {
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
    console.log(`Barbearia rodando no seguinte servidor: http://localhost:${PORT}`)
})