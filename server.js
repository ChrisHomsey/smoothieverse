// Dependencies

var express = require('express'),
	env = require('dotenv').load(),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	exphbs = require("express-handlebars"),
	path = require('path');

// Sets up the express app
var app = express();
var PORT = process.env.PORT || 3000;

// Static directory
app.use(express.static("public"));

// Body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie-parser setup
app.use(cookieParser());

// Session and passport setup
app.use(session({ secret: 'developmentstagesecret0017',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars
app.engine("handlebars", exphbs({
	defaultLayout: "main",
	layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set("view engine", "handlebars");

//Models
db = require('./models');

// Routes
require("./routes/api-routes.js")(app, db);
require("./routes/html-routes.js")(app);
var authRoute = require('./routes/auth.js')(app, passport);

//Load passport strategy
require('./config/passport/passport.js')(passport, db.User);


// Syncing our sequelize model and starting our app
db.sequelize.sync({ force: true }).then(function(){
	app.listen(PORT, function(){
		console.log("App listening on PORT " + PORT);
	});
});