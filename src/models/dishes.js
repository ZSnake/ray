/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var dishes = sequelize.define('dishes', {
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  });
  return dishes;
};