const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/FuncionarioNovo");
const FuncionarioNovo = mongoose.model("FuncionariosNovos");

router.get('/', (req, res) => {
    res.render("admin/menu-admin")
})

router.get('/cadastro-funcionario', (req, res) => {
    res.render("admin/cadastro-funcionario")
})

router.post('/cadastro-funcionario/novo', (req, res) => {
    //Validação do formulário de cadastro do funcionário
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

    if (!req.body.dasHora || typeof req.body.dasHora == undefined || req.body.dasHora == null) {
        erros.push({ texto: "Hora de inicio do serviço não infomado" })
    }

    if (!req.body.ateHora || typeof req.body.ateHora == undefined || req.body.ateHora == null) {
        erros.push({ texto: "Hora do fim do serviço não foi informado" })
    }

    if ((
        req.body.segunda == undefined &&
        req.body.segunda == undefined &&
        req.body.segunda == undefined &&
        req.body.segunda == undefined &&
        req.body.segunda == undefined &&
        req.body.segunda == undefined &&
        req.body.segunda == undefined
    ) || (
            req.body.segunda == null &&
            req.body.segunda == null &&
            req.body.segunda == null &&
            req.body.segunda == null &&
            req.body.segunda == null &&
            req.body.segunda == null
        )
    ) {
        erros.push({ texto: "Nenhum dia de trabalho foi cadastrado" })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "A senha não foi informada" })
    }

    if (erros.length > 0) {
        res.render('admin/cadastro-funcionario', { erros: erros })
    } else {
        const novoFuncionario = {
            nome: req.body.nome,
            userName: req.body.userName,
            email: req.body.email,
            cpf: req.body.cpf,
            dasHora: req.body.dasHora,
            ateHora: req.body.ateHora,

            //Array com os dias de trabalho
            diasDeTrabalho: [
                req.body.segunda,
                req.body.terca,
                req.body.quarta,
                req.body.quinta,
                req.body.sexta,
                req.body.sabado,
                req.body.domingo,
            ],
            senha: req.body.senha,
        }
        new FuncionarioNovo(novoFuncionario).save().then(() => {
            req.flash("success_msg", "Funcionario cadastrado com sucesso!")
            res.redirect("/admin")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao cadastrar o novo funcionário tente novamente!")
            console.log("Erro ao cadastrar o novo funcionario" + err)
            res.redirect("/admin")
        })
    }
})

router.get('/lista-de-clientes', (req, res) => {
    res.render("admin/lista-de-clientes")
})

router.get('/lista-de-funcionarios', (req, res) => {
    res.render("admin/lista-de-funcionarios")
})

router.get('/controle-de-caixa', (req, res) => {
    res.render("admin/controle-de-caixa")
})

router.get('/perfil-administrador', (req, res) => {
    res.render("admin/perfil-admin")
})

module.exports = router;