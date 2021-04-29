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
router.post('/agendamentos/novo',(req, res) => {

    var erros = []

    if (!req.body.func || typeof req.body.func == undefined || req.body.func == null){
        erros.push({texto:"Funcionário Inválido"})
    }

    if (!req.body.servicos || typeof req.body.servicos == undefined || req.body.servicos == null ){
        erros.push({texto: "Serviço Invalido"})
    }

    if (!req.body.DataServico || typeof req.body.DataServico == undefined || req.body.DataServico == null){
        erros.push({texto: "Data Invalida"})
    }

    if (!req.body.horaservico || typeof req.body.horaservico == undefined || req.body.horaservico == null){
        erros.push({texto: "Horário Invalido"})
    }

    if (!req.body.pagamento || typeof req.body.pagamento == undefined || req.body.pagamento == null){
        erros.push({texto: "Pagamento Invalido"})
    }

    if (!req.body.numero < 8){
        erros.push({texto: "Número Invalido"})
    }else{
        const Servico = {
            nome_do_funcionario: req.body.func,
            Selecionar_servico: req.body.servicos,
            data_do_servico: req.body.DataServico,
            horario: req.body.horaservico,
            pagamento: req.body.pagamento,
            numero: req.body.numero,
            observações: req.body.obs

        }
        new ServicoNovo(Servico).save().then(()=>{
            req.flash("success_msg", "Agendamento Confirmado!")
            res.redirect("/client/confirmacao-agendamento")
        }).catch((err)=>{
            req.flash("error_msg", "Agendamento Negado")
            res.redirect("/confirmar-pagamento")
        })
    }
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