module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('dishes', {
    id: {
      type: Sequelize.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'dishes',
  }),

  down: queryInterface => queryInterface.dropTable('dishes'),
};
