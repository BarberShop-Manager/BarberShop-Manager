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

    passport.use(new localStrategy({ usernameField: 'email', passwordField: "senha" }, (email, senha, done) => {
        Client.findOne({ email: email }).then((cliente) => {
            if (!cliente) {
                return done(null, false, { message: "Esta conta não existe" });
            }

            bcrypt.compare(senha, cliente.senha, (erro, batem) => {
                if (batem) {
                    return done(null, cliente)
                } else {
                    return done(null, false, { message: "Senha incorreta " })
                }
            })
        })
    }))

    passport.serializeUser((cliente, done) => {
        done(null, cliente.id);
    });

    passport.deserializeUser((id, done) => {
        Client.findById(id, (err, cliente) => {
            done(err, cliente)
        })
    });

}
