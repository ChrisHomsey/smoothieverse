var authController = require('../controllers/authcontroller.js');

var newUser;

module.exports = function(app, passport) {

	//declare session Data
	var sessionData;
 
    app.get('/signup', authController.signup);

    app.post('/signup', passport.authenticate('local-signup', 
	    {
	 		failureRedirect: '/signup',
	 		session: true
 		}),
 		function(req, res){
 			console.log(req.body.username);
 			newUser = req.body.username;
 			res.redirect('/signup-success');
 		}
 	);

	app.get('/signup-success', function(req,res){

		res.render('signup-success', { user: newUser });
	
	});
 	
 	app.get('/login', authController.login);

 	app.post('/login', passport.authenticate('local-signin', 
	 	{
	 		failureRedirect: '/login',
	 		session: true
 		}),
 		function(req, res){
 			req.session.user = req.user;
 			req.session.save(function(err){
 				if (err) return next(err)
 				console.log(req.session.user);
  				res.redirect('/dashboard');
 			})
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