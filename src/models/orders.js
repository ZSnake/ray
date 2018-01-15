'use strict';
module.exports = (sequelize, DataTypes) => {
  var orders = sequelize.define('orders', {
    userId: DataTypes.INTEGER,
    dishCount: DataTypes.INTEGER,
    totalAmount: DataTypes.REAL
    card: DataTypes.BOOLEAN,
    cash: DataTypes.BOOLEAN,
    additionalDetails: DataTypes.TEXT,
    done: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};
