var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {

	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	//Local Signup Strategy - Creates new users using the information provided by the user
	passport.use('local-signup', new LocalStrategy(

		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},

		function(req, username, password, done) {
			var generateHash = function(password){

				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			
			};

			User.findOne({
				where: {
					username: username
				}
			}).then(function(user) {

				if (user) {
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				} else {

					var userPassword = generateHash(password);

					var data = 
						{
							username: username,
							password: userPassword
						};

					User.create(data).then(function(newUser,created){

						if(!newUser) {
							return done(null,false);
						}

						if (newUser) {
							return done(null, newUser);
						}

					});

				}

			});

		}

	));

	//Local Sign In Strategy - Allows users to sign in to the application
	passport.use('local-signin', new LocalStrategy(
	
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: 'true'
		},

		function(req, username, password, done) {

			var User = user;


			//Compares the password entered with the stored password (bCrypted)
			var isValidPassword = function(userpass, password) {

				return bCrypt.compareSync(password, userpass);

			}

			User.findOne({
				where: {
					username: username
				}
			}).then(function(user) {

				if (!user) {
					console.log("Login failed. Username does not exist.");
					return done(null, false, req.flash('loginMessage', 'Username does not exist'));
				}

				if (!isValidPassword(user.password, password)) {

					console.log("Login failed. Incorrect password.");
					return done(null, false, req.flash('loginMessage','Incorrect password'));

				}

				var userinfo = user.get();
				return done(null, userinfo);
			
			}).catch(function(err){

				console.log("Error: ", err);

				return done(null, false, req.flash('loginMessage', 'Something went wrong with your Signin'));

			});
		}
	
	));

	//Serialize User
	passport.serializeUser(function(user, done) {

		done(null, user.id);
		
	});

	//Deserialize User
	passport.deserializeUser(function(id, done){

		User.findById(id).then(function(user){
			if (user) {

				done(null, user.get());

			} else {

				done(user.errors, null);

			}

		});

	});
}