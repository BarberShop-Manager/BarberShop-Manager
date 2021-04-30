const express = require('express');
const router = express.Router();
const {_nivel1} = require("../helpers/_nivel")

router.get('/', _nivel1,(req, res) => {
    res.render("employee/menu-funcionario")
})

router.get('/lista-de-agendamentos',_nivel1, (req, res) => {
    res.render("employee/lista-de-agendamentos")
})

router.get('/confirmar-pagamento',_nivel1, (req, res) => {
    res.render("employee/confirmar-pagamento")
})

router.get('/perfil-funcionario',_nivel1, (req, res) => {
    res.render("employee/perfil-funcionario")
})

module.exports = router;
