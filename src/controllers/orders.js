import Boom from 'boom';
import models from '../models/index';
import ordersHelper from '../helpers/ordersHelper';

const getAllOrders = async (request, reply) => {
  try {
    const orders = await models.orders.findAll({
      attributes: ['*'],
      raw: true,
    });
    const mappedOrders =
      await Promise.all(orders.map(order => ordersHelper.getOrderDetails(order)));
    return reply(mappedOrders);
  } catch (error) {
    return reply(Boom.badRequest(`Error fetching orders: ${error}`));
  }
};

const createOrder = async (request, reply) => {
  try {
    const createdOrder = await models.orders.create({
      ...request.payload,
      userId: request.params.userId,
    });
    const recordsToCreate = request.payload.dishes.map((dishId) => {
      const orderId = createdOrder.id;
      return {
        orderId,
        dishId,
      };
    });
    const orderDetails =
      await models.orderDetails.bulkCreate(recordsToCreate, { returning: true });
    return reply({ createdOrder, orderDetails });
  } catch (error) {
    return reply(Boom.badRequest(`Error creating the order: ${error}`));
  }
};

const deleteOrder = async (request, reply) => {
  try {
    const deleteStatus1 = await models.orderDetails.destroy({
      where: {
        orderId: request.params.orderId,
      },
    });
    const deleteStatus2 = await models.orders.destroy({
      where: {
        id: request.params.orderId,
      },
    });
    return reply({ deleteStatus1, deleteStatus2 });
  } catch (error) {
    return reply(Boom.badRequest(`Couldn't remove order: ${error}`));
  }
};

const updateOrder = async (request, reply) => {
  try {
    const updateStatus = await models.orders.update(request.payload, {
      where: {
        id: request.params.orderId,
      },
    });
    return reply(updateStatus);
  } catch (error) {
    return reply(Boom.badRequest(`Couldn't update order: ${error}`));
  }
};

const updateDishesInOrder = async (request, reply) => {
  try {
    const recordsToCreate = request.payload.dishes.map((dishId) => {
      const orderId = request.params.orderId;
      return {
        orderId,
        dishId,
      };
    });
    const deleteStatus = await models.orderDetails.destroy({
      where: {
        orderId: request.params.orderId,
      },
    });
    const orderDetails =
      await models.orderDetails.bulkCreate(recordsToCreate, { returning: true });
    return reply({ deleteStatus, orderDetails });
  } catch (error) {
    return reply(Boom.badRequest(`Error updating dishes on order: ${error}`));
  }
};

const getOrderById = async (request, reply) => {
  try {
    const order = await models.orders.findOne({
      where: {
        id: request.params.orderId,
      },
    });
    return reply(order);
  } catch (e) {
    return reply(Boom.badRequest(`Can't fetch order: ${e}`));
  }
};

export default {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  updateDishesInOrder,
  getOrderById,
};
