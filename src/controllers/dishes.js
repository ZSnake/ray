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
    const recordsToCreate = request.payload.ingredients.map((ingredients) => {
      const ingredientId = ingredients.ingredientId;
      const dishId = request.params.dishId;
      const amount = ingredients.amount;
      return {
        dishId,
        ingredientId,
        amount,
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
    const recordsToCreate = request.payload.ingredients.map((ingredients) => {
      const ingredientId = ingredients.ingredientId;
      const dishId = request.params.dishId;
      const amount = ingredients.amount;
      return {
        dishId,
        ingredientId,
        amount,
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

const getDishById = async (request, reply) => {
  try {
    const dish = await models.dishes.findOne({
      raw: true,
      where: {
        id: request.params.dishId,
      },
    });
    const fullDish = await dishHelper.getDishIngredients(dish);
    return reply(fullDish);
  } catch (e) {
    return reply(Boom.badRequest(`Can't fetch ingredient: ${e}`));
  }
};

const getDishIngredientAmount = async (request, reply) => {
  try {
    const amount = await models.dishIngredients.findOne({
      attribute: 'amount',
      where: {
        dishId: request.params.dishId,
        ingredientId: request.params.ingredientId,
      },
    });
    return reply(amount);
  } catch (e) {
    return reply(Boom.badRequest(`Can't fetch amount: ${e}`));
  }
};

const getDishNutritionalFacts = async (request, reply) => {
  try {
    const dish = await models.dishes.findOne({
      where: {
        id: request.params.dishId,
      },
    });
    const dishWithIngredients = await dishHelper.getDishIngredients(dish);
    const ingredients = dishWithIngredients.ingredients;
    const ingredientsWithAmount =
      await dishHelper.getIngredientsWithAmount(request.params.dishId, ingredients);
    let nutritionalFacts = {
      calories: 0,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      polyunsaturatedFat: 0,
      monosaturatedFat: 0,
      cholesterol: 0,
      sodium: 0,
      totalCarbohydrates: 0,
      dietaryFiber: 0,
      sugars: 0,
      addedSugar: 0,
      sugarAlcohol: 0,
      protein: 0,
      calcium: 0,
      iron: 0,
      vitaminD: 0,
      potassium: 0,
    };
    ingredientsWithAmount.forEach((ingredient) => {
      nutritionalFacts.calories +=
        (ingredient.amount * ingredient.dataValues.calories);
      nutritionalFacts.totalFat +=
        (ingredient.amount * ingredient.dataValues.totalFat);
      nutritionalFacts.saturatedFat +=
        (ingredient.amount * ingredient.dataValues.saturatedFat);
      nutritionalFacts.transFat +=
        (ingredient.amount * ingredient.dataValues.transFat);
      nutritionalFacts.polyunsaturatedFat +=
        (ingredient.amount * ingredient.dataValues.polyunsaturatedFat);
      nutritionalFacts.monosaturatedFat +=
        (ingredient.amount * ingredient.dataValues.monosaturatedFat);
      nutritionalFacts.cholesterol +=
        (ingredient.amount * ingredient.dataValues.cholesterol);
      nutritionalFacts.sodium +=
        (ingredient.amount * ingredient.dataValues.sodium);
      nutritionalFacts.totalCarbohydrates +=
        (ingredient.amount * ingredient.dataValues.totalCarbohydrates);
      nutritionalFacts.dietaryFiber +=
        (ingredient.amount * ingredient.dataValues.dietaryFiber);
      nutritionalFacts.sugars +=
        (ingredient.amount * ingredient.dataValues.sugars);
      nutritionalFacts.addedSugar +=
        (ingredient.amount * ingredient.dataValues.addedSugar);
      nutritionalFacts.sugarAlcohol +=
        (ingredient.amount * ingredient.dataValues.sugarAlcohol);
      nutritionalFacts.protein +=
        (ingredient.amount * ingredient.dataValues.protein);
      nutritionalFacts.calcium +=
        (ingredient.amount * parseInt(ingredient.dataValues.calcium, 10));
      nutritionalFacts.iron +=
        (ingredient.amount * parseInt(ingredient.dataValues.iron, 10));
      nutritionalFacts.vitaminD +=
        (ingredient.amount * parseInt(ingredient.dataValues.vitaminD, 10));
      nutritionalFacts.potassium +=
        (ingredient.amount * parseInt(ingredient.dataValues.potassium, 10));
    });
    return reply({
      dish,
      nutritionalFacts,
    });
  } catch (e) {
    return reply(Boom.badRequest(`Can't fetch nutritional facts: ${e}`));
  }
};

export default {
  getAllDishes,
  createDish,
  addIngredientsToDish,
  deleteDish,
  updateDish,
  updateIngredientsOnDish,
  getDishById,
  getDishIngredientAmount,
  getDishNutritionalFacts,
};
