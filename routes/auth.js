var authController = require('../controllers/authcontroller.js');


module.exports = function(app, passport) {

	//declare session Data
 
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


 	app.get('/logout', authController.logout);


 	//Routes that require authentication to access
 	app.get('/dashboard', isLoggedIn, authController.dashboard);

 	app.get('/submit', isLoggedIn, function(req, res){
 		res.render('submit', { sessionUser: req.session.user });
 	});


 	//Function that checks to see if the user is authenticated- if not, it will redirect to the login
 	function isLoggedIn(req, res, next) {
 
	    if (req.isAuthenticated()) {
	    	return next();
	    }

	    res.redirect('/login');
 
	}

}