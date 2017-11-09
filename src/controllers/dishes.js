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

export default {
  getAllDishes,
  createDish,
  addIngredientsToDish,
};
