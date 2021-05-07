const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/FuncionarioNovo");
const FuncionarioNovo = mongoose.model("FuncionariosNovos");
require("../models/Administrador");
const Administrador = mongoose.model("administradores");
const { nivel0 } = require("../helpers/nivel")
const bcrypt = require("bcryptjs")

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
        req.body.terca == undefined &&
        req.body.quarta == undefined &&
        req.body.quinta == undefined &&
        req.body.sexta == undefined &&
        req.body.sabado == undefined &&
        req.body.domingo == undefined
    ) || (
            req.body.segunda == null &&
            req.body.terca == null &&
            req.body.quarta == null &&
            req.body.quinta == null &&
            req.body.sexta == null &&
            req.body.sabado == null &&
            req.body.domingo == null
        )
    ) {
        erros.push({ texto: "Nenhum dia de trabalho foi cadastrado" })
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
        res.render('admin/cadastro-funcionario', { erros: erros })
    } else {
        FuncionarioNovo.findOne({ email: req.body.email }).then((funcionario) => {
            if (funcionario) {
                req.flash("error_msg", "Já existe uma conta cadastrada neste email")
                res.redirect("/admin/cadastro-funcionario")
            } else {
                const novoFuncionario = new FuncionarioNovo({
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

                    dataNasc: req.body.dataNasc,
                    tele: req.body.tele,
                    senha: req.body.senha,
                    nivel: req.body.nivel
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoFuncionario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("erro_msg", "Houve um erro durante o salvamento do funcionário")
                            res.redirect("/admin")
                        }

                        novoFuncionario.senha = hash;

                        novoFuncionario.save().then(() => {
                            req.flash("success_msg", "Funcionário cadastrado com sucesso!")
                            res.redirect("/admin")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao cadastrar o funcionário, tente novamente!")
                            res.redirect("/admin/cadastro-funcionario")
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/admin")
        })
    }
})

router.get('/lista-de-clientes', (req, res) => {
    res.render("admin/lista-de-clientes")
})

router.get('/lista-de-funcionarios', (req, res) => {
    FuncionarioNovo.find().sort({ data: "desc" }).then((funcionariosnovos) => {
        res.render("admin/lista-de-funcionarios", { funcionariosnovos: funcionariosnovos })
    }).catch((err) => {
        req.flash("error_msg", "Houve ume erro ao listar os funcionários")
        res.redirect("/admin")
    })
})

router.get('/perfil-funcionario/:_id', (req, res) => {
    FuncionarioNovo.findOne({ _id: req.params._id }).then((funcionario) => {
        if (funcionario) {
            res.render("funcionario/perfil-funcionario", { funcionario: funcionario })
        } else {
            req.flash("error_msg", "Este funcionário não existe")
            res.redirect("/admin/lista-de-funcionarios")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro, este funcionario não exite")
        res.redirect("/admin/lista-de-funcionarios")
    })
})

router.get("/perfil-funcionario/excluir/:_id", (req, res) => {
    FuncionarioNovo.remove({ _id: req.params._id }).then(() => {
        res.redirect("/admin/lista-de-funcionarios")
    })
})

router.get('/controle-de-caixa', (req, res) => {
    res.render("admin/controle-de-caixa")
})

router.get('/perfil-admin', (req, res) => {
    Administrador.find({ nivel: 0 }).then((administrador) => {
        res.render("admin/perfil-admin", { administrador: administrador })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao encontrar o administrador")
        res.redirect("/admin")
    })
})

router.post('/perfil-admin/edit', (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome muito pequeno!" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email não foi informado." })
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
        res.render('admin/perfil-admin', { erros: erros })
    } else {
        Administrador.findOne({ nivel: 0 }).then((administrador) => {
            administrador.nome = req.body.nome,
                administrador.email = req.body.email,
                administrador.senha = req.body.senha

            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(administrador.senha, salt, (erro, hash) => {
                    if (erro) {
                        req.flash("erro_msg", "Houve um erro durante o salvamento do funcionário")
                        res.redirect("/admin")
                    }

                    administrador.senha = hash;

                    administrador.save().then(() => {
                        req.flash("success_msg", "Perfil editado com sucesso!")
                        res.redirect("/admin")
                    }).catch((err) => {
                        req.flash("error_msg", "Houve um erro ao editar o perfil.")
                        res.redirect("/admin" + err)
                    })
                })
            })
        }).catch((err) => {
            req.flash("error_msg", "Erro ao encontrar o administrador")
            res.redirect("/admin")
        })
    }
})

module.exports = router;