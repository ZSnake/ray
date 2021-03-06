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

const updateIngredient = async (request, reply) => {
  try {
    const updateStatus = await models.ingredient.update(request.payload, {
      where: {
        id: request.params.ingredientId,
      },
    });
    return reply(updateStatus);
  } catch (error) {
    return reply(boom.badRequest(`Couldn't update ingredient: ${error}`));
  }
};

const deleteIngredient = async (request, reply) => {
  try {
    const deleteStatus1 = await models.dishIngredients.destroy({
      where: {
        ingredientId: request.params.ingredientId,
      },
    });
    const deleteStatus2 = await models.ingredient.destroy({
      where: {
        id: request.params.ingredientId,
      },
    });
    return reply({ deleteStatus1, deleteStatus2 });
  } catch (error) {
    return reply(boom.badRequest(`Couldn't remove ingredient: ${error}`));
  }
};

export default {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
