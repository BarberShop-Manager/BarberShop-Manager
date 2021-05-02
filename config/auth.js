const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model do cliente
require("../models/ClienteNovo");
//Model do funcionario
require("../models/FuncionarioNovo");

const Client = mongoose.model("clientes");
const Func = mongoose.model("FuncionariosNovos")

module.exports = function (passport) {

    passport.use('local-user',new localStrategy({ usernameField: 'email', passwordField: "senha" }, (email, senha, done) => {
        Client.findOne({ email: email }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Esta conta não existe" });
            }

            bcrypt.compare(senha, user.senha, (erro, batem) => {
                if (batem) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "Senha incorreta " })
                }
            })
        })
    }))

    passport.use('local-func',new localStrategy({ usernameField: 'email', passwordField: "senha" }, (email, senha, done) => {
        Func.findOne({ email: email }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Esta conta não existe" });
            }

            bcrypt.compare(senha, user.senha, (erro, batem) => {
                if (batem) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "Senha incorreta " })
                }
            })
        })
    }))


    passport.serializeUser(function(user, done) {
        let nivel = user.nivel;
        done(null, { _id: user.id, nivel: nivel});
      });
      
      passport.deserializeUser(function(data, done) {
        if(data.nivel == 2){
            Client.findById(data._id, function(err, user) {
            done(err, user);
          });
        } else{
            Func.findById(data._id, function(err, user) {
            done(err, user);
          });
        }
      });
 }
