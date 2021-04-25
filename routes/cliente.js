const express = require('express');
const router = express.Router();
require("../models/FuncionarioNovo");
const userNew = userNew


router.get('/', (req, res) => {
    res.render("client/menu-cliente")
})

router.get('/agendamentos', (req, res) => {
    res.render("client/agendamentos")
})

router.get('/lista-de-funcionarios', (req, res) => {
    res.render("client/lista-de-funcionarios")
})

router.get('/perfil-cliente', (req, res) => {
    res.render("client/perfil-cliente")
})

router.get('/cadastro', (req,res)=>{
    res.render("cadastro-cliente")
})


router.post('/new-user',(req, res)=> {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "E-mail invalido"})
    }

    if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
        erros.push({texto: "Telefone invalido"})
    }
    
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha invalida"})
    }

    if(req.body.senha < 6){
        erros.push({texto: "Senha muito curta"})
    }

    if(erros.length > 0){
        res.render("cadastro-cliente", {erros: erros})
    }else{
       await userNew.findOne({where: {email: req.body.email}}).then((user)=>{
           if(user){
               req.flash("erro_msg", "Já existe uma conta com este e-mail no nosso sitema")
               res.redirect('/cadastro')
           }else{

           }
       }).catch((err)=>{
           req.flash("erro_msg", "Houve um erro interno")
           res.redirect('/')
       })
    }
})





module.exports = router;