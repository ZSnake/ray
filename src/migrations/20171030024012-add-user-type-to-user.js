'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'users',
      'type',
      {
        type: Sequelize.STRING,
      }
    ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('users', 'type'),
};
