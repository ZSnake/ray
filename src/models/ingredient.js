'use strict';
module.exports = (sequelize, DataTypes) => {
  var ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    totalFat: DataTypes.INTEGER,
    saturatedFat: DataTypes.INTEGER,
    transFat: DataTypes.INTEGER,
    polyunsaturatedFat: DataTypes.INTEGER,
    monosaturatedFat: DataTypes.INTEGER,
    cholesterol: DataTypes.INTEGER,
    sodium: DataTypes.INTEGER,
    totalCarbohydrates: DataTypes.INTEGER,
    dietaryFiber: DataTypes.INTEGER,
    sugars: DataTypes.INTEGER,
    addedSugar: DataTypes.INTEGER,
    sugarAlcohol: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    calcium: DataTypes.DECIMAL,
    iron: DataTypes.DECIMAL,
    vitaminD: DataTypes.DECIMAL,
    potassium: DataTypes.DECIMAL,
    description: DataTypes.TEXT
  });
  return ingredient;
};