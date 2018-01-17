import Joi from 'joi';
import controller from '../controllers/orders';

module.exports = [
  {
    method: 'GET',
    path: '/orders',
    config: {
      auth: 'jwt',
      handler: {
        async: controller.getAllOrders,
      },
      description: 'Get all orders',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items({
                dataValues: Joi.object({
                  id: Joi.string().required(),
                  userId: Joi.string().required(),
                  dishCount: Joi.number(),
                  totalAmount: Joi.number(),
                  card: Joi.boolean(),
                  cash: Joi.boolean(),
                  additionalDetails: Joi.string(),
                  done: Joi.boolean(),
                }),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/order/{userId}',
    config: {
      //  auth: 'jwt',
      validate: {
        params: {
          userId: Joi.number().required(),
        },
        payload: {
          dishCount: Joi.number().required(),
          totalAmount: Joi.number().required(),
          card: Joi.boolean().required(),
          cash: Joi.boolean().required(),
          additionalDetails: Joi.string(),
          dishes: Joi.array().items(Joi.number()).allow(),
          done: false,
        },
      },
      handler: {
        async: controller.createOrder,
      },
      description: 'Create new order',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                userId: Joi.string().required(),
                dishCount: Joi.number(),
                totalAmount: Joi.number(),
                card: Joi.boolean(),
                cash: Joi.boolean(),
                additionalDetails: Joi.string(),
                done: Joi.boolean(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/order/{orderId}',
    config: {
      auth: 'jwt',
      handler: {
        async: controller.deleteOrder,
      },
      validate: {
        params: {
          orderId: Joi.number().required(),
        },
      },
      description: 'Delete specific order.',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                userId: Joi.string().required(),
                dishCount: Joi.number(),
                totalAmount: Joi.number(),
                card: Joi.boolean(),
                cash: Joi.boolean(),
                additionalDetails: Joi.string(),
                done: Joi.boolean(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/order/{userId}/{orderId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          userId: Joi.string().required(),
          orderId: Joi.number().required(),
        },
        payload: {
          dishCount: Joi.number(),
          totalAmount: Joi.number(),
          card: Joi.boolean(),
          cash: Joi.boolean(),
          additionalDetails: Joi.string(),
          done: Joi.boolean(),
        },
      },
      handler: {
        async: controller.updateOrder,
      },
      description: 'Update order.',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                userId: Joi.string().required(),
                dishCount: Joi.number(),
                totalAmount: Joi.number(),
                card: Joi.boolean(),
                cash: Joi.boolean(),
                additionalDetails: Joi.string(),
                done: Joi.boolean(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/order/dishes/change/{orderId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          orderId: Joi.number().required(),
        },
        payload: {
          dishes: Joi.array().items(Joi.number()).allow(),
        },
      },
      handler: {
        async: controller.updateDishesInOrder,
      },
      description: 'Update dishes in an order from a list of IDs',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(Joi.number()).allow(),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/order/{orderId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          orderId: Joi.number().required(),
        },
      },
      handler: {
        async: controller.getOrderById,
      },
      description: 'Get all orders.',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                userId: Joi.string().required(),
                dishCount: Joi.number(),
                totalAmount: Joi.number(),
                card: Joi.boolean(),
                cash: Joi.boolean(),
                additionalDetails: Joi.string(),
                done: Joi.boolean(),
              }),
            },
          },
        },
      },
    },
  },
];
