import Sequelize from 'sequelize';
import models from '../models/';

const getDishIngredients = async (dish) => {
  const ingredientIds = await models.dishIngredients.findAll({
    attribute: 'ingredientId',
    where: {
      dishId: dish.id,
    },
    raw: true,
  }).map(di => di.ingredientId);
  const ingredients = await models.ingredient.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: ingredientIds,
      },
    },
  });
  return {
    ...dish,
    ingredients,
  };
};

const getAmount = async (provDishId, ingredient) => {
  const amount = await models.dishIngredients.findOne({
    where: {
      dishId: provDishId,
      ingredientId: ingredient.id,
    },
  });
  return amount.amount;
};


const getIngredientsWithAmount = async (dishId, ingredients) => {
  const ingredientsWithAmount = await Promise.all(ingredients.map(async (ingredient) => {
    const amount = await getAmount(dishId, ingredient);
    return {
      ...ingredient,
      amount,
    };
  }));
  return ingredientsWithAmount;
};

export default {
  getDishIngredients,
  getIngredientsWithAmount,
  getAmount,
};
