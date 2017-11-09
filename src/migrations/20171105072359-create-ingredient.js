'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      calories: {
        type: Sequelize.INTEGER
      },
      totalFat: {
        type: Sequelize.INTEGER
      },
      saturatedFat: {
        type: Sequelize.INTEGER
      },
      transFat: {
        type: Sequelize.INTEGER
      },
      polyunsaturatedFat: {
        type: Sequelize.INTEGER
      },
      monosaturatedFat: {
        type: Sequelize.INTEGER
      },
      cholesterol: {
        type: Sequelize.INTEGER
      },
      sodium: {
        type: Sequelize.INTEGER
      },
      totalCarbohydrates: {
        type: Sequelize.INTEGER
      },
      dietaryFiber: {
        type: Sequelize.INTEGER
      },
      sugars: {
        type: Sequelize.INTEGER
      },
      addedSugar: {
        type: Sequelize.INTEGER
      },
      sugarAlcohol: {
        type: Sequelize.INTEGER
      },
      protein: {
        type: Sequelize.INTEGER
      },
      calcium: {
        type: Sequelize.DECIMAL
      },
      iron: {
        type: Sequelize.DECIMAL
      },
      vitaminD: {
        type: Sequelize.DECIMAL
      },
      potassium: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ingredients');
  }
};