const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require("../models/ClienteNovo");
const Client = mongoose.model("clientes");
const bcrypt = require("bcryptjs")
const {_nivel2} = require("../helpers/_nivel")

router.get('/',_nivel2, (req, res) => {
    res.render("client/menu-cliente")
})

router.get('/agendamentos',_nivel2, (req, res) => {
    res.render("client/agendamentos")
})

router.get('/lista-de-funcionarios',_nivel2, (req, res) => {
    res.render("client/lista-de-funcionarios")
})

router.get('/perfil-cliente',_nivel2, (req, res) => {
    res.render("client/perfil-cliente")
})

router.post('/new-user',(req,res)=>{
        
    let erros = [];

    if(!req.body._name || typeof req.body._name == undefined || req.body._name == null){
        erros.push({mensagem: "Nome Inválido"})
    }

    if(!req.body._username || typeof req.body._username == undefined || req.body._username == null){
        erros.push({mensagem: "Usuário Inválido"})
    }
    if(!req.body._email || typeof req.body._email == undefined || req.body._email == null){
        erros.push({mensagem: "Email Inválido"})
    }

    if(!req.body._cpf || typeof req.body._cpf == undefined || req.body._cpf == null){
        erros.push({mensagem: "CPF Inválido"})
    }

    if(!req.body._password || typeof req.body._password == undefined || req.body._password == null){
        erros.push({mensagem: "Senha Inválida"})
    }

    if(req.body._password.length < 8 || req.body._password.length > 30 ){
        erros.push({mensagem: "Senha precisa pode ter mínimo de 8 e máximo 30 caracteres "})
    }

    if(req.body._password != req.body._password2){
        erros.push({mensagem: "As senhas estão diferentes tente novamente"})
    }
    
    if(erros.length > 0){
        res.render("cadastro-cliente", {erros: erros});
    }else{
        Client.findOne({_username:req.body._username}).then((client) =>{
            if(client){
                req.flash("success_msg","Já existe uma conta com esse email e/ou usuario");
                res.redirect("/cadastro");
            }else{
                const novoCliente = new Client({
                        _name:req.body._name,
                        _username:req.body._username,
                        _email:req.body._email,
                        _cpf:req.body._cpf,
                        _date:req.body._date,
                        _password:req.body._password,
                        _telephone:req.body._telephone,
                        _nivel:req.body._nivel
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoCliente._password, salt, (erro, hash) => {
                        if(erro){
                            req.flash("error_msg", "Houve um erro durante o cadastro do usuario");
                            res.redirect("/");
                        }

                        novoCliente._password = hash;

                        novoCliente.save().then(()=>{
                                req.flash("success_msg","Usuário cadastrado com sucesso");
                                res.redirect("/");
                            }).catch((err)=>{
                                req.flash("error_msg","Houve um erro ao cadastrar o usuário" + err);
                                res.redirect("/cadastro");
                        });

                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno " + err);
            res.redirect("/")
        });
    }

})

module.exports = router;