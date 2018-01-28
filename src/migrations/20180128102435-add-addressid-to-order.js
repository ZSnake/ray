'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'orders',
      'addressId',
      {
        type: Sequelize.INTEGER,
      }
    ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('orders', 'addressId'),
};
