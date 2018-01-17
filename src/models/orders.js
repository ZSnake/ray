'use strict';
module.exports = (sequelize, DataTypes) => {
  var orders = sequelize.define('orders', {
    userId: DataTypes.INTEGER,
    dishCount: DataTypes.INTEGER,
    totalAmount: DataTypes.REAL,
    card: DataTypes.BOOLEAN,
    cash: DataTypes.BOOLEAN,
    additionalDetails: DataTypes.TEXT,
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: DataTypes.FALSE,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};
