module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    	validate: {
    		len: [1]
    	}
    }

  });

  Comment.associate = function(models){
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Comment.belongsTo(models.Smoothie, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Comment;
};