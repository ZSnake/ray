import Joi from 'joi';
import dishesController from '../controllers/dishes';

module.exports = [
  {
    method: 'GET',
    path: '/dishes',
    config: {
      //  auth: 'jwt',
      handler: {
        async: dishesController.getAllDishes,
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
      auth: 'jwt',
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string(),
        },
      },
      handler: {
        async: dishesController.createDish,
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
  {
    method: 'PUT',
    path: '/dish/ingredients/{dishId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          dishId: Joi.number().required(),
        },
        payload: {
          ingredientsIds: Joi.array().items(Joi.number()).allow(),
        },
      },
      handler: {
        async: dishesController.addIngredientsToDish,
      },
      description: 'Add ingredients to a dish from a list of IDs',
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
    method: 'DELETE',
    path: '/dish/{dishId}',
    config: {
      auth: 'jwt',
      handler: {
        async: dishesController.deleteDish,
      },
      validate: {
        params: {
          dishId: Joi.number().required(),
        },
      },
      description: 'Delete specific dish',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().allow(),
                description: Joi.string().allow(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/dish/{dishId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          dishId: Joi.number().required(),
        },
        payload: {
          name: Joi.string().required(),
          description: Joi.string(),
        },
      },
      handler: {
        async: dishesController.updateDish,
      },
      description: 'Update dish',
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
    method: 'PUT',
    path: '/dish/ingredients/change/{dishId}',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          dishId: Joi.number().required(),
        },
        payload: {
          ingredientsIds: Joi.array().items(Joi.number()).allow(),
        },
      },
      handler: {
        async: dishesController.updateIngredientsOnDish,
      },
      description: 'Update ingredients on a dish from a list of IDs',
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
];
