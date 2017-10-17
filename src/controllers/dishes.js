import Boom from 'boom';
import models from '../models/index';


const getAllDishes = function* (request, reply) {
  try {
    const dishes = yield models.dishes.findAll({
      attributes: ['*'],
    });
    return reply(dishes);
  } catch (error) {
    return reply(Boom.notAcceptable(`Error fetching dishes: ${error}`));
  }
};

const createDish = function* (request, reply) {
  try {
    const createdDish = yield models.dishes.create(request.payload);
    return reply(createdDish);
  } catch (error) {
    return reply(Boom.notAcceptable(`Error creating the dish: ${error}`));
  }
};

export default {
  getAllDishes,
  createDish,
};
