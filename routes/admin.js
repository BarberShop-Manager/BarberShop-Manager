const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("admin/menu-admin")
})

router.get('/cadastro-funcionario', (req, res) => {
    res.render("admin/cadastro-funcionario")
})

router.get('/lista-de-clientes', (req, res) => {
    res.render("admin/lista-de-clientes")
})

router.get('/lista-de-funcionarios', (req, res) => {
    res.render("admin/lista-de-funcionarios")
})

router.get('/controle-de-caixa', (req, res) => {
    res.render("admin/controle-de-caixa")
})

router.get('/perfil-administrador', (req, res) => {
    res.render("admin/perfil-admin")
})

module.exports = router;