const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { serializeUser } = require('passport');
require ('../models/ServicoNovo')
const cadhorario = mongoose.model("cadhorario")
require('../models/PagamentoNovo')
const PagamentoNovo = mongoose.model("pagamento-cliente")
require ('../models/ClienteNovo')
const Cliente = mongoose.model('clientes')
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

router.get('/perfil-funcionario/', nivel1, (req, res) => {
    Cliente.findOne({_id: user._id}).then((clientes)=>{
        res.render("employee/perfil-funcionario", {clientes: clientes})
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao ver perfil"+err)
    })
})



router.get('/perfil-funcionario/edit/:id', nivel1, (req, res) => {
    Cliente.findOne({_id: req.params.id}).then((cliente)=>{
        res.render("employee/edit-perfil", {clientes: clientes})
    }).catch((err)=>{
        req.flash("error_msg", "Erro"+err)
    })
})

router.post('/perfil-funcionario/edit', (req,res)=>{
    let erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ mensagem: "Nome Inválido" })
    }

    if (!req.body.userName || typeof req.body.userName == undefined || req.body.userName == null) {
        erros.push({ mensagem: "Usuário Inválido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ mensagem: "Email Inválido" })
    }

    if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
        erros.push({ mensagem: "CPF Inválido" })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ mensagem: "Senha Inválida" })
    }

    if (req.body.senha.length < 8 || req.body.senha.length > 30) {
        erros.push({ mensagem: "Senha precisa pode ter mínimo de 8 e máximo 30 caracteres " })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ mensagem: "As senhas não batem!" })
    }

    if (erros.length > 0) {
        res.redirect("funcionario/perfil-funcionario/edit", { erros: erros });
    } else {
        Cliente.findOne({ email: req.body.email }).then((clientes) => {
            if (clientes) {
                req.flash("success_msg", "Já existe uma conta com esse email e/ou usuario");
                res.redirect("/funcionario/perfil-fucnionario/edit");
            } else {
                const novoCliente = new Cliente({
                    nome: req.body.nome,
                    userName: req.body.userName,
                    email: req.body.email,
                    cpf: req.body.cpf,
                    dataNasc: req.body.dataNasc,
                    senha: req.body.senha,
                    tele: req.body.tele,
                    nivel: req.body.nivel
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoCliente.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Houve um erro durante o a alteração de dados");
                            res.redirect("/");
                        }

                        novoCliente.senha = hash;

                        novoCliente.save().then(() => {
                            req.flash("success_msg", "Dados alterados com sucesso");
                            res.redirect("/");
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao alterar os dados" + err);
                            res.redirect("/funcionario/perfil-funcionario");
                        });

                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno " + err);
            res.redirect("/funcionario/perfil-funcionario")
        });
    }
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
