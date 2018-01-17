import Sequelize from 'sequelize';
import models from '../models/';

const getOrderDetails = async (order) => {
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
    dishes,
  };
};

export default {
  getOrderDetails,
};
