module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
    	type: DataTypes.STRING,
    	allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
        len: [4,20]
      }
    }, 
    password: {
    	type: DataTypes.STRING,
    	allowNull: false,
      validate: {
        len: [8,24]
      }
    }
  });

  User.associate = function(models){
    User.hasMany(models.Smoothie, {
      onDelete: "cascade"
    })

    User.hasMany(models.Comment, {
      onDelete: "cascade"
    })
  }


  return User;
};