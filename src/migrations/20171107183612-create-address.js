'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      colony: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      celphone: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('addresses');
  }
};