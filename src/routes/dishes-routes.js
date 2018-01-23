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
                  price: Joi.number(),
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
          price: Joi.number().required(),
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
                  price: Joi.number(),
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
          ingredients: Joi.array().items(Joi.object({
            ingredientId: Joi.number().required(),
            amount: Joi.number().required(),
          })).allow(),
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
              schema: Joi.array().items({
                dataValues: Joi.object({
                  ingredients: Joi.array().items(Joi.object({
                    ingredientId: Joi.number().required(),
                    amount: Joi.number().required(),
                  })).allow(),
                }),
              }),
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
                price: Joi.number(),
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
          price: Joi.number(),
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
                  price: Joi.number(),
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
          ingredients: Joi.array().items(Joi.object({
            ingredientId: Joi.number().required(),
            amount: Joi.number().required(),
          })).allow(),
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
              schema: Joi.array().items({
                dataValues: Joi.object({
                  ingredients: Joi.array().items(Joi.object({
                    ingredientId: Joi.number().required(),
                    amount: Joi.number().required(),
                  })).allow(),
                }),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/dish/{dishId}',
    config: {
      //  auth: 'jwt',
      validate: {
        params: {
          dishId: Joi.number().required(),
        },
      },
      handler: {
        async: dishesController.getDishById,
      },
      description: 'Get all dishes',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                price: Joi.number(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/dish/amount/{dishId}/{ingredientId}',
    config: {
      //  auth: 'jwt',
      validate: {
        params: {
          dishId: Joi.number().required(),
          ingredientId: Joi.number().required(),
        },
      },
      handler: {
        async: dishesController.getDishIngredientAmount,
      },
      description: 'Get amount of specific ingredient in a dish.',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.number().required(),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/dish/nutritionalFacts/{dishId}',
    config: {
      auth: 'jwt',
      handler: {
        async: dishesController.getDishNutritionalFacts,
      },
      description: 'Get dish nutritional facts.',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().allow(),
                calories: Joi.number().allow(),
                totalFat: Joi.number().allow(),
                saturatedFat: Joi.number().allow(),
                transFat: Joi.number().allow(),
                polyunsaturatedFat: Joi.number().allow(),
                monosaturatedFat: Joi.number().allow(),
                cholesterol: Joi.number().allow(),
                sodium: Joi.number().allow(),
                totalCarbohydrates: Joi.number().allow(),
                dietaryFiber: Joi.number().allow(),
                sugars: Joi.number().allow(),
                addedSugar: Joi.number().allow(),
                sugarAlcohol: Joi.number().allow(),
                protein: Joi.number().allow(),
                calcium: Joi.number().allow(),
                iron: Joi.number().allow(),
                vitaminD: Joi.number().allow(),
                potassium: Joi.number().allow(),
                description: Joi.string().allow(),
              }),
            },
          },
        },
      },
    },
  },
];
