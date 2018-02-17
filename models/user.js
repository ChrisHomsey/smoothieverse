module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {
    		len: [1, 16]
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