const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require("../models/ClienteNovo");
const Client = mongoose.model("clientes");
require("../models/ServicoNovo")
const ServicoNovo = mongoose.model("cadhorario")
const bcrypt = require("bcryptjs")
const { nivel2 } = require("../helpers/nivel")

router.get('/',nivel2, (req, res) => {
    res.render("client/menu-cliente")
})

router.get('/agendamentos',nivel2, (req, res) => {
    res.render("client/agendamentos")
})
router.post('/agendamentos/novo',nivel2, (req, res) => {

    var erros = []

    if (!req.body.func || typeof req.body.func == undefined || req.body.func == null) {
        erros.push({ texto: "Funcionário Inválido" })
    }

    if (!req.body.servicos || typeof req.body.servicos == undefined || req.body.servicos == null) {
        erros.push({ texto: "Serviço Invalido" })
    }

    if (!req.body.DataServico || typeof req.body.DataServico == undefined || req.body.DataServico == null) {
        erros.push({ texto: "Data Invalida" })
    }

    if (!req.body.horaservico || typeof req.body.horaservico == undefined || req.body.horaservico == null) {
        erros.push({ texto: "Horário Invalido" })
    }

    if (!req.body.pagamento || typeof req.body.pagamento == undefined || req.body.pagamento == null) {
        erros.push({ texto: "Pagamento Invalido" })
    }

    if (req.body.numero.length < 8) {
        erros.push({ texto: "Número Invalido" })
    }
    if (erros.length > 0) {
        res.render("client/agendamentos", { erros: erros })
    } else {
        const Servico = new ServicoNovo({
            nome_do_funcionario: req.body.func,
            Selecionar_servico: req.body.servicos,
            data_do_servico: req.body.DataServico,
            horario: req.body.horaservico,
            pagamento: req.body.pagamento,
            numero: req.body.numero,
            observações: req.body.obs

        })
        Servico.save().then(() => {
            req.flash("success_msg", "Agendamento Confirmado!")
            res.redirect("/")
        }).catch((err) => {
            req.flash("error_msg", "Agendamento Negado" + err)
            res.redirect("/cliente/agendamentos")
        })
    }
})

router.get('/lista-de-funcionarios', nivel2,(req, res) => {
    res.render("client/lista-de-funcionarios")
})

router.get('/perfil-cliente',nivel2, (req, res) => {
    res.render("client/perfil-cliente")
})

//Essa Rota não pode ter nível se não, não é possível cadastrar um cliente

router.post('/novo', (req, res) => {

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
        res.render("cadastro-cliente", { erros: erros });
    } else {
        Client.findOne({ email: req.body.email }).then((client) => {
            if (client) {
                req.flash("success_msg", "Já existe uma conta com esse email e/ou usuario");
                res.redirect("/cadastro");
            } else {
                const novoCliente = new Client({
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
                            req.flash("error_msg", "Houve um erro durante o cadastro do usuario");
                            res.redirect("/");
                        }

                        novoCliente.senha = hash;

                        novoCliente.save().then(() => {
                            req.flash("success_msg", "Usuário cadastrado com sucesso");
                            res.redirect("/");
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao cadastrar o usuário" + err);
                            res.redirect("/cadastro");
                        });

                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno " + err);
            res.redirect("/")
        });
    }
})

module.exports = router;