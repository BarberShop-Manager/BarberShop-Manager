module.exports = {
    _nivel: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um funcionario da Barbearia!");
        res.redirect("/")
    }
}