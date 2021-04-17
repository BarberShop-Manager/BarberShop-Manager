const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Página menu admin")
})

router.get('/cadastrar-funcionario', (req, res) => {
    res.send("Página de cadastrar Funcionario ")
})

router.get('/mostrar-clientes', (req, res) => {
    res.send("Página para Mostrar Clientes")
})

router.get('/mostrar-funcionarios', (req, res) => {
    res.send("Página para Mostrar Funcionários")
})

router.get('/controle-de-caixa', (req, res) => {
    res.send("Controle de Caixa")
})

router.get('/perfil-admin', (req, res) => {
    res.send("Página Perfil admin")
})

router.get('/atualiza-dados', (req, res) => {
    res.send("Página atualiza dados")
})

module.exports = router;