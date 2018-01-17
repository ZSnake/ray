'use strict';
module.exports = (sequelize, DataTypes) => {
  var orderDetails = sequelize.define('orderDetails', {
    dishId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    dishAmount: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orderDetails;
};
