// Dependencies
// ==========================================

var path = require("path");

// Routes
// ==========================================

module.exports = function(app, passport) {

	//Each route shown below just handles the HTML page the user gets sent to.

	//index route goes to index.html
	app.get("/", function(req, res){
		// console.log(authRoute.isLoggedIn);
		res.render("index", { sessionUser: req.session.user });
	});

	//recipe goes to recipe-display.html
	app.get("/recipe", function(req, res){
		res.sendFile(path.join(__dirname, "../public/recipe-display.html"));
	});

	//search goes to search-recipe.html
	app.get("/search", function(req, res){
		res.render("search", { sessionUser: req.session.user });
	});

	//submit goes to submit-recipe.html
	// app.get("/submit", function(req, res){
	// 	console.log(req.session);
	// 	res.render("submit", isLoggedIn, { sessionUser: req.session.user });
	// });

	//user goes to search-recipe.html
	app.get("/user", function(req, res){
		res.sendFile(path.join(__dirname, "../public/user-display.html"));
	});


	function isLoggedIn(req, res, next) {
 
	    if (req.isAuthenticated()) {
	    	return next();
	    }

	    console.log("Sorry, you are not logged in. Redirecting to /login page")
	    res.redirect('/login');
 
	}

}