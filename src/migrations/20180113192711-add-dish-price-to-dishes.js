'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'dishes',
      'price',
      {
        type: Sequelize.DOUBLE,
      }
    ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('dishes', 'price'),
};
