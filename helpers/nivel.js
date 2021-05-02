module.exports = {
    nivel2: function (req, res, next) {
        if (req.isAuthenticated() && req.user.nivel == 2) {
            return next();
        }
        req.flash("error_msg", "Você precisa está cadastrado na barbearia Barbearia!");
        res.redirect("/")
    },
    nivel1: function (req, res, next) {
        if (req.isAuthenticated() && req.user.nivel == 1) {
            return next();
        }
        req.flash("error_msg", "Você precisa ser um funcionario da Barbearia!");
        res.redirect("/")
    },
    nivel0: function (req, res, next) {
        if (req.isAuthenticated() && req.user.nivel == 0) {
            return next();
        }
        req.flash("error_msg", "Você precisa ser um administrador da Barbearia!");
        res.redirect("/")
    }

}