const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require('../models/PagamentoNovo')
const PagamentoNovo = mongoose.model("pagamento-cliente")

router.get('/', (req, res) => {
    res.render("employee/menu-funcionario")
})

router.get('/lista-de-agendamentos', (req, res) => {
    res.render("employee/lista-de-agendamentos")
})

router.get('/confirmar-pagamento', (req, res) => {
    res.render("employee/confirmar-pagamento")
})

router.post('/confirmar-pagamento/novo', (req,res)=>{
    const NovoPagamento = {
        Name_client: req.body.name,
        Service: req.body.service,
        Data_service: req.body.date,
        Hour_service: req.body.time,
        Payment_form: req.body.payform,
        Value: req.body.valor,
        Observ: req.body.observ
    }

    new PagamentoNovo(NovoPagamento).save().then(()=>{
        console.log("Dados de pagamento salvos com sucesso!")
    }).catch((err)=>{
        console.log("Erro ao salvar dados de pagamento "+err)
    })
})

router.get('/perfil-funcionario', (req, res) => {
    res.render("employee/perfil-funcionario")
})

module.exports = router;
