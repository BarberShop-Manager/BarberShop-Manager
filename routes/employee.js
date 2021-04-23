const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("employee/menu-funcionario")
})

router.get('/lista-de-agendamentos', (req, res) => {
    res.render("employee/lista-de-agendamentos")
})

router.get('/confirmar-pagamento', (req, res) => {
    res.render("employee/confirmar-pagamento")
})

router.get('/perfil-funcionario', (req, res) => {
    res.render("employee/perfil-funcionario")
})

module.exports = router;
