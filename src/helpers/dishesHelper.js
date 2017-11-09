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

export default {
  getDishIngredients,
};
