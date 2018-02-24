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

	//smothie goes to recipe-display to show a single recipe page
	app.get("/:id", function(req, res){
		db.Smoothie.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(result){
			var chosenRecipe = result.dataValues;
			var chosenIngredients = chosenRecipe.ingredients;
			console.log();
			res.render("recipe-display", { recipe: chosenRecipe, ingredients: chosenIngredients, sessionUser: req.session.user });
		});
		
	});


	function isLoggedIn(req, res, next) {
 
	    if (req.isAuthenticated()) {
	    	return next();
	    }

	    console.log("Sorry, you are not logged in. Redirecting to /login page")
	    res.redirect('/login');
 
	}

}