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

    var erros = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: "Nome invalido"})
    }

    if(req.body.name.length <= 2){
        erros.push({texto: "Nome muito curto"})
    }

    if(!req.body.service || typeof req.body.service == undefined || req.body.service == null){
        erros.push({texto: "Serviço invalido"})
    }

    if(!req.body.date || typeof req.body.date == undefined || req.body.date == null){
        erros.push({texto: "Data invalida"})
    }

    if(!req.body.time || typeof req.body.time == undefined || req.body.time == null){
        erros.push({texto: "Hora invalida"})
    }

    if(!req.body.payform || typeof req.body.payform == undefined || req.body.payform == null){
        erros.push({texto: "Forma de pagamento invalida"})
    }

    if(!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null){
        erros.push({texto: "Valor invalido"})
    }

    if(erros.length > 0){
        res.render("employee/confirmar-pagamento", {erros: erros})
    }else{
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
            req.flash("success_msg", "Dados de pagamento salvo!")
<<<<<<< HEAD
            res.redirect("/employee/confirmar-pagamento")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao tentar salvar os dados de pagamento")
            res.redirect("/employee/confirmar-pagamento")
=======
            res.redirect("/funcionario/confirmar-pagamento")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao tentar salvar os dados de pagamento")
            res.redirect("/funcionario/confirmar-pagamento")
>>>>>>> e33f4cf66af048641f33f78128eb9d0e4243b103
        })
    }
})

router.get('/perfil-funcionario', (req, res) => {
    res.render("employee/perfil-funcionario")
})

module.exports = router;
