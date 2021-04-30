const express = require('express');
const router = express.Router();
const {_nivel0} = require("../helpers/_nivel")
 

router.get('/', _nivel0, (req, res) => {
    res.render("admin/menu-admin")
})

router.get('/cadastro-funcionario',_nivel0, (req, res) => {
    res.render("admin/cadastro-funcionario")
})

router.get('/lista-de-clientes',_nivel0, (req, res) => {
    res.render("admin/lista-de-clientes")
})

router.get('/lista-de-funcionarios',_nivel0, (req, res) => {
    res.render("admin/lista-de-funcionarios")
})

router.get('/controle-de-caixa',_nivel0, (req, res) => {
    res.render("admin/controle-de-caixa")
})

router.get('/perfil-administrador',_nivel0, (req, res) => {
    res.render("admin/perfil-admin")
})

module.exports = router;