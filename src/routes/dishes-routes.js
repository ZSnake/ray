import co from 'co';
import Joi from 'joi';

import dishesController from '../controllers/dishes';

module.exports = [
  {
    method: 'GET',
    path: '/dishes',
    config: {
      handler: {
        async: co.wrap(dishesController.getAllDishes),
      },
      description: 'Get all dishes',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items({
                dataValues: Joi.object({
                  id: Joi.string().required(),
                  name: Joi.string().required(),
                  description: Joi.string(),
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
    path: '/dish',
    config: {
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string(),
        },
      },
      handler: {
        async: co.wrap(dishesController.createDish),
      },
      description: 'Create new dish',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items({
                dataValues: Joi.object({
                  id: Joi.string().required(),
                  name: Joi.string().required(),
                  description: Joi.string(),
                }),
              }),
            },
          },
        },
      },
    },
  },
];
