var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        
      }
    }
  },
  {
    classMethods: {
      validPassword: function(password, passwd, done, user){
        bcrypt.compare(password, passwd, function(err, isMatch){
          if (err) console.log(err);
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
      }
    }
  },
  {
    dialect: 'mysql'
  }
  );

  User.associate = function(models){
    User.hasMany(models.Smoothie, {
      onDelete: "cascade"
    })

    User.hasMany(models.Comment, {
      onDelete: "cascade"
    })
  }

  return User;
}