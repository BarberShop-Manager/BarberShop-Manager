module.exports = {
    _nivel: function(req, res, next){
        if(req.isAuthenticated() && req.client._nivel == 2){
            return next();
        }
        req.flash("error_msg", "Você precisa ser um funcionario da Barbearia!");
        res.redirect("/")
    },

    _nivel1: function(req, res , next){
        
    }

}