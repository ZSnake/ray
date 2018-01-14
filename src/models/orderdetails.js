'use strict';
module.exports = (sequelize, DataTypes) => {
  var orderDetails = sequelize.define('orderDetails', {
    dishId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    dishAmount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return orderDetails;
};