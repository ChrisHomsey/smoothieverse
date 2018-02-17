// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the express app
var app = express();
var PORT = process.env.PORT || 3000;

// Use models for syncing
var db = require("./models");

// Sets up express app to handle data parsing

// Static directory
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize model and starting our app
db.sequelize.sync({ force: true }).then(function(){
	app.listen(PORT, function(){
		console.log("App listening on PORT " + PORT);
	});
});