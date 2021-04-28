const express = require('express');
const router = express.Router();


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