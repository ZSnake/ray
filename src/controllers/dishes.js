import Boom from 'boom';
import models from '../models/index';
import dishHelper from '../helpers/dishesHelper';


const getAllDishes = async (request, reply) => {
  try {
    const dishes = await models.dishes.findAll({
      attributes: ['*'],
      raw: true,
    });
    const mappedDishes = await Promise.all(dishes.map(dish => dishHelper.getDishIngredients(dish)));
    return reply(mappedDishes);
  } catch (error) {
    return reply(Boom.badRequest(`Error fetching dishes: ${error}`));
  }
};

const createDish = async (request, reply) => {
  try {
    const createdDish = await models.dishes.create(request.payload);
    return reply(createdDish);
  } catch (error) {
    return reply(Boom.badRequest(`Error creating the dish: ${error}`));
  }
};

const addIngredientsToDish = async (request, reply) => {
  try {
    const recordsToCreate = request.payload.ingredientsIds.map((ingredientId) => {
      const dishId = request.params.dishId;
      return {
        dishId,
        ingredientId,
      };
    });
    const dishIngredients =
      await models.dishIngredients.bulkCreate(recordsToCreate, { returning: true });
    return reply(dishIngredients);
  } catch (error) {
    return reply(Boom.badRequest(`Error adding ingredients to dishes: ${error}`));
  }
};

const deleteDish = async (request, reply) => {
  try {
    const deleteStatus1 = await models.dishIngredients.destroy({
      where: {
        dishId: request.params.dishId,
      },
    });
    const deleteStatus2 = await models.dishes.destroy({
      where: {
        id: request.params.dishId,
      },
    });
    return reply({ deleteStatus1, deleteStatus2 });
  } catch (error) {
    return reply(Boom.badRequest(`Couldn't remove dish: ${error}`));
  }
};

const updateDish = async (request, reply) => {
  try {
    const updateStatus = await models.dishes.update(request.payload, {
      where: {
        id: request.params.dishId,
      },
    });
    return reply(updateStatus);
  } catch (error) {
    return reply(Boom.badRequest(`Couldn't update dish: ${error}`));
  }
};

const updateIngredientsOnDish = async (request, reply) => {
  try {
    const recordsToCreate = request.payload.ingredientsIds.map((ingredientId) => {
      const dishId = request.params.dishId;
      return {
        dishId,
        ingredientId,
      };
    });
    const deleteStatus = await models.dishIngredients.destroy({
      where: {
        dishId: request.params.dishId,
      },
    });
    const dishIngredients =
      await models.dishIngredients.bulkCreate(recordsToCreate, { returning: true });
    return reply({ deleteStatus, dishIngredients });
  } catch (error) {
    return reply(Boom.badRequest(`Error updating ingredients on dish: ${error}`));
  }
};

export default {
  getAllDishes,
  createDish,
  addIngredientsToDish,
  deleteDish,
  updateDish,
  updateIngredientsOnDish,
};
