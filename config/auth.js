const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model do cliente
require("../models/ClienteNovo");
const Client = mongoose.model("clientes");


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

    passport.serializeUser((client, done)=>{
        done( null, client.id)
    })
    
    passport.deserializeUser((id, done)=>{
        Client.findById(id, (err,client)=>{
            done(err,client)
        })
    })

}
