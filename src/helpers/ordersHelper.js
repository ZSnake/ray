import Sequelize from 'sequelize';
import models from '../models/';

const getOrderDetails = async (order) => {
  const address = await models.address.findOne({
    where: {
      id: order.addressId,
    },
  });
  const dishesIds = await models.orderDetails.findAll({
    attribute: 'dishId',
    where: {
      orderId: order.id,
    },
    raw: true,
  }).map(or => or.dishId);
  const dishes = await models.dishes.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: dishesIds,
      },
    },
  });
  return {
    ...order,
    address,
    dishes,
  };
};

const getTotalAmount = async (dishesIds) => {
  const dishes = await models.dishes.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: dishesIds,
      },
    },
  });
  let totalAmount = 0;
  dishes.forEach((dish) => {
    totalAmount += dish.price;
  });
  return totalAmount;
};

export default {
  getOrderDetails,
  getTotalAmount,
};
