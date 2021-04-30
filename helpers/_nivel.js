module.exports = {
    _nivel2: function(req, res, next){
        if(req.isAuthenticated() && req.user._nivel == 2){
            return next();
        }
        req.flash("error_msg", "Você precisa está cadastrado na barbearia Barbearia!");
        res.redirect("/")
    },
    _nivel1: function(req, res, next){
        if(req.isAuthenticated() && req.user._nivel == 1){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um funcionario da Barbearia!");
        res.redirect("/")
    },
    _nivel0: function(req, res, next){
        if(req.isAuthenticated() && req.user._nivel == 0){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um administrador da Barbearia!");
        res.redirect("/")
    }

}