const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require("../models/ServicoNovo")
const ServicoNovo = mongoose.model("cadhorario")

router.get('/', (req, res) => {
    res.render("client/menu-cliente")
})

router.get('/agendamentos', (req, res) => {
    res.render("client/agendamentos")
})

router.get('/lista-de-funcionarios', (req, res) => {
    res.render("client/lista-de-funcionarios")
})

router.get('/perfil-cliente', (req, res) => {
    res.render("client/perfil-cliente")
})

router.post('/new-user',(req, res)=> {
    res.render("")
})



module.exports = router;