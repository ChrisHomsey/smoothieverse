var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('signup');
}

exports.login = function(req, res) {
	res.render('login', { message: req.flash('loginMessage')});
}

exports.dashboard = function(req, res) {
	
	res.render('dashboard', { sessionUser: req.session.user });
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
        res.redirect('/login');
    });
}