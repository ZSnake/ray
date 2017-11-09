'use strict';
module.exports = (sequelize, DataTypes) => {
  var dishIngredients = sequelize.define('dishIngredients', {
    dishId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return dishIngredients;
};