import Joi from 'joi';
import controller from '../controllers/ingredients';

module.exports = [
  {
    method: 'GET',
    path: '/ingredients',
    config: {
      auth: 'jwt',
      handler: {
        async: controller.getAllIngredients,
      },
      description: 'Get all ingredients',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(
                Joi.object({
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
              ),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/ingredient/{id}',
    config: {
      auth: 'jwt',
      handler: {
        async: controller.getIngredientById,
      },
      validate: {
        params: {
          id: Joi.number().required(),
        },
      },
      description: 'Get specific ingredient',
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
  {
    method: 'POST',
    path: '/ingredient',
    config: {
      auth: 'jwt',
      handler: {
        async: controller.createIngredient,
      },
      validate: {
        payload: {
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
        },
      },
      description: 'Create new ingredient',
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
