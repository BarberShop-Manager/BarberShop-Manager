const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { serializeUser } = require('passport');
require ('../models/ServicoNovo')
const cadhorario = mongoose.model("cadhorario")
require('../models/PagamentoNovo')
const PagamentoNovo = mongoose.model("pagamento-cliente")
require ('../models/ClienteNovo')
const clientes = mongoose.model('clientes')
require ('../models/FuncionarioNovo')
const FuncionarioNovo = mongoose.model("FuncionariosNovos")
const { nivel1 } = require("../helpers/nivel")
const bcrypt = require("bcryptjs")

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
    cadhorario.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Agendamento excluido com sucesso")
        res.redirect("/funcionario/lista-de-agendamentos")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao tentar excluir agendamento "+err)
        res.redirect("/funcionario/lista-de-agendamentos")
    })
})

router.post('/lista-de-agendamentos/realizar', nivel1, (req,res)=>{
    cadhorario.deleteOne({_id: req.body.id}).then(()=>{
        res.redirect("/funcionario/confirmar-pagamento")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao tentar excluir agendamento "+err)
        res.redirect("/funcionario/lista-de-agendamentos")
    })
})

router.get('/confirmar-pagamento', nivel1, (req, res) => {
    res.render("employee/confirmar-pagamento")
})

router.get('/historico-pagamento', nivel1, (req, res) => {
    PagamentoNovo.find().then((PagamentoNovo)=>{
        res.render("employee/historico-pagamento",{PagamentoNovo:PagamentoNovo})
    }).catch((err)=>{
        req.flash("Erro ao exibir agendamentos" + err)
        res.redirect("/employeer")
    })
    
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


router.get('/perfil-funcionario/', nivel1, (req, res) => {
    FuncionarioNovo.findOne({_id: req.user._id}).then((funcionario)=>{
        res.render("employee/perfil-funcionario", {funcionario: funcionario})  
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao ver perfil"+err)
        res.redirect("/funcionario")
    })
})



router.get('/perfil-funcionario/edit/:id', nivel1, (req, res) => {
    FuncionarioNovo.findOne({_id: req.params.id}).then((funcionario)=>{
        res.render("employee/edit-perfil", {funcionario: funcionario})
    }).catch((err)=>{
        req.flash("error_msg", "Erro"+err)
        res.redirect("/funcionario/perfil-funcionario")
    })
})

router.post('/perfil-funcionario/edit/alterar', (req,res)=>{
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome muito pequeno!" })
    }

    if (!req.body.userName || typeof req.body.userName == undefined || req.body.userName == null) {
        erros.push({ texto: "Nome de usuário inválido" })
    }

    if (req.body.userName.length < 2) {
        erros.push({ texto: "Nome de usuário muito pequeno!" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email não foi informado." })
    }

    if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
        erros.push({ texto: "CPF não foi informado." })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "A senha não foi informada" })
    }

    if (req.body.senha.length < 4) {
        erros.push({ texto: "Senha muito curta." })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas não batem!" })
    }

    if (erros.length > 0) {
        res.render('funcionario/perfil-funcionario', { erros: erros })
    } else {
        FuncionarioNovo.findOne({ email: req.body.email }).then((funcionario) => {
            if (funcionario) {
                req.flash("error_msg", "Já existe uma conta cadastrada neste email")
                res.redirect("/funcionario/perfil-funcionario"+err)
            } else {
                FuncionarioNovo.findOne({_id: req.user._id}).then((funcionario)=>{
                    nome = req.body.nome,
                    userName = req.body.userName,
                    email = req.body.email,
                    cpf = req.body.cpf,
                    dataNasc = req.body.dataNasc,
                    senha = req.body.senha,
                    nivel = req.body.nivel

                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(funcionario.senha, salt, (erro, hash) => {
                            if (erro) {
                                req.flash("erro_msg", "Houve um erro durante o salvamento do funcionário")
                                res.redirect("/funcionario/perfil-funcionario")
                            }
    
                            funcionario.senha = hash;
    
                            FuncionarioNovo.save().then(() => {
                                req.flash("success_msg", "Sucesso ao alterar dados!")
                                res.redirect("funcionario/perfil-funcionario")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao tantar alterar os dados, tente novamente!")
                                res.redirect("/funcionario/perfil-funcionario"+err)
                            })
                        })
                    })
                })          
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno"+err)
            res.redirect("/funcionario")
        })
    }
})
// trocar Cliente por clientes
router.get('/apagar-cliente', nivel1, (req,res)=>{
    clientes.find({nivel: 2}).then((clientes)=>{
        res.render("employee/apagar-cliente", {clientes: clientes})
    }).catch((err)=>{
        console.flash("error_msg", "Erro ao listar clintes cadastrados"+err)
        res.redirect("/funcionario")
    })
})

router.post('/apagar-cliente/apagar', (req,res)=>{
    clientes.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Cliente removido com sucesso!")
        res.redirect("/funcionario/apagar-cliente")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao tentar remover cliente"+err)
        res.redirect("/funcionario/apagar-cliente")
    })
})


module.exports = router;
