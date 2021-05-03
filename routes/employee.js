const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require ('../models/ServicoNovo')
const cadhorario = mongoose.model("cadhorario")
require('../models/PagamentoNovo')
const PagamentoNovo = mongoose.model("pagamento-cliente")
require ('../models/ClienteNovo')
const Cliente = mongoose.model(clientes)
const { nivel1 } = require("../helpers/nivel")

router.get('/',nivel1, (req, res) => {
    res.render("employee/menu-funcionario")
})

router.get('/lista-de-agendamentos', nivel1, (req, res) => {
    cadhorario.find().then((cadhorario)=>{
        res.render("employee/lista-de-agendamentos",{cadhorario:cadhorario})
    }).catch((err)=>{
        req.flash("Erro ao exibir agendamentos" + err)
        res.redirect("/employeer")
    })
    
})

router.post('/lista-de-agendamentos/deletar', nivel1, (req,res)=>{
    cadhorario.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Agendamento excluido com sucesso")
        req.redirect("/employee/lista-de-agendamentos")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao tentar excluir agendamento "+err)
    })
})

router.get('/confirmar-pagamento', nivel1, (req, res) => {
    res.render("employee/confirmar-pagamento")
})

router.post('/confirmar-pagamento/novo', nivel1, (req, res) => {

    var erros = []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({ texto: "Nome invalido" })
    }

    if (req.body.name.length <= 2) {
        erros.push({ texto: "Nome muito curto" })
    }

    if (!req.body.service || typeof req.body.service == undefined || req.body.service == null) {
        erros.push({ texto: "Serviço invalido" })
    }

    if (!req.body.date || typeof req.body.date == undefined || req.body.date == null) {
        erros.push({ texto: "Data invalida" })
    }

    if (!req.body.time || typeof req.body.time == undefined || req.body.time == null) {
        erros.push({ texto: "Hora invalida" })
    }

    if (!req.body.payform || typeof req.body.payform == undefined || req.body.payform == null) {
        erros.push({ texto: "Forma de pagamento invalida" })
    }

    if (!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null) {
        erros.push({ texto: "Valor invalido" })
    }

    if (erros.length > 0) {
        res.render("employee/confirmar-pagamento", { erros: erros })
    } else {
        const NovoPagamento = new PagamentoNovo({
            Name_client: req.body.name,
            Service: req.body.service,
            Data_service: req.body.date,
            Hour_service: req.body.time,
            Payment_form: req.body.payform,
            Value: req.body.valor,
            Observ: req.body.observ

        })

        NovoPagamento.save().then(() => {
            req.flash("success_msg", "Dados de pagamento salvos!!")
            res.redirect("/")
        }).catch((err) => {
            req.flash("error_msg", "Erro no pagamento" + err)
            res.redirect("/funcionario/confirmar-pagamento")



        })
    }
})

router.get('/perfil-funcionario', nivel1, (req, res) => {
    res.render("employee/perfil-funcionario")
})

router.get('/apagar-cliente', nivel1, (req,res)=>{
    Cliente.find({"clientes.nivel": 2}).then((clientes)=>{
        res.render("/employee/apagar-cliente", {clientes: clientes})
    }).catch((err)=>{
        console.flash("error_msg", "Erro ao listar clintes cadastrados"+err)
        res.redirect("/funcionario")
    })
})

router.post('/apagar-cliente/apagar', (req,res)=>{
    Cliente.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Cliente removido com sucesso!")
        res.redirect("/funcionario/apagar-cliente")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao tentar remover cliente"+err)
        res.redirect("/funcionario/apagar-cliente")
    })
})


module.exports = router;
