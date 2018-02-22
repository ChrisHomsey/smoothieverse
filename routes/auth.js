var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);

    app.post('/signup', passport.authenticate('local-signup', 
	    {
	 		successRedirect: '/dashboard',
	 		failureRedirect: '/signup'
 		}
 	));
 	
 	app.get('/login', authController.login);

 	app.post('/login', passport.authenticate('local-signin', 
	 	{
	 		failureRedirect: '/login'
 		}),
 		function(req, res){
 			console.log("res begin", res.req.user);
 			res.redirect('/dashboard');
 		}
 	);

 	app.get('/dashboard', isLoggedIn, authController.dashboard);

 	app.get('/logout', authController.logout);

 	//Function that checks to see if the user is authenticated- if not, it will redirect to the login
 	function isLoggedIn(req, res, next) {
 
	    if (req.isAuthenticated()) {
	    	return next();
	    }

	    console.log("Sorry, you are not logged in. Redirecting to /login page")
	    res.redirect('/login');
 
	}
}