'use strict';
module.exports = (sequelize, DataTypes) => {
  var address = sequelize.define('address', {
    userId: DataTypes.INTEGER,
    colony: DataTypes.TEXT,
    city: DataTypes.STRING,
    department: DataTypes.STRING,
    phone: DataTypes.STRING,
    celphone: DataTypes.STRING,
    street: DataTypes.STRING,
    block: DataTypes.STRING,
    house: DataTypes.STRING,
    reference: DataTypes.STRING,
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
  return address;
};