import boom from 'boom';
import models from '../models/';

const getAllIngredients = async (request, reply) => {
  try {
    const ingredients = await models.ingredient.findAll({
      raw: true,
    });
    return reply(ingredients);
  } catch (e) {
    return reply(boom.badRequest(`Can't fetch ingredients: ${e}`));
  }
};

const getIngredientById = async (request, reply) => {
  try {
    const ingredient = await models.ingredient.findOne({
      where: {
        id: request.params.id,
      },
      raw: true,
    });
    return reply(ingredient);
  } catch (e) {
    return reply(boom.badRequest(`Can't fetch ingredient: ${e}`));
  }
};

const createIngredient = async (request, reply) => {
  try {
    const ingredient = await models.ingredient.create(request.payload);
    return reply(ingredient);
  } catch (e) {
    return reply(boom.badRequest(`Can't create ingredient: ${e}`));
  }
};

export default {
  getAllIngredients,
  getIngredientById,
  createIngredient,
};
