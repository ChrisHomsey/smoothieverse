module.exports = function(sequelize, DataTypes) {
  var Smoothie = sequelize.define("Smoothie", {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {
    		len: [1, 255]
    	}
    },
    apiName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ingredients: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });
  return Smoothie;
};