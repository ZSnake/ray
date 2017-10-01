/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('holidays', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    occurs: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'holidays'
  });
};
