'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'dishIngredients',
      'amount',
      {
        type: Sequelize.DOUBLE,
      }
    ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('dishIngredients', 'amount'),
};
