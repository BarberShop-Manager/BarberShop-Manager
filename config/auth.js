const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model do cliente
require("../models/ClienteNovo");
require("../models/FuncionarioNovo");

const Client = mongoose.model("clientes");
const Func = mongoose.model("FuncionariosNovos")

module.exports = function(passport) {

    passport.use( new localStrategy({usernameField: '_username', passwordField: "_password"},(_username,_password,done) =>{
        Client.findOne({_username: _username }).then((client)=>{
            if(!client){
                return done(null, false, {message: "Esta conta não existe"});
            }

            bcrypt.compare(_password, client._password, (erro, batem) =>{
                if(batem){
                    return done(null, client)
                }else{
                    return done(null, false, {message: "Senha inválida "})
                }
            })
        })
    }))

    passport.use( new localStrategy({usernameField: 'userName', passwordField: "senha"},(userName,senha,done) =>{
        Func.findOne({userName: userName }).then((func)=>{
            if(!func){
                return done(null, false, {message: "Esta conta não existe"});
            }
        })
    }))

    passport.serializeUser((client,func, done) => {
        done(null, { id: client.id, id:func.id, _nivel: client._nivel, _nivel:func._nivel });
    });

    passport.deserializeUser((login, done) => {
        if (login.role === 1) {
            Func.findById(login, function (err, func) {
                if (func)
                    done(null, func);
                else
                    done(err, { message: 'User not found' })
            });
        }
        else if (login.role === 2) {
            Client.findById(login, (err, client) => {
                if (client)
                    done(null, client);
                else
                    done(err, { message: 'Admin not found' })
            });
        }
        else {
            done({ message: 'No entity found' }, null);
        }
    });
   
}
