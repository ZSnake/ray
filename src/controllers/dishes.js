import Boom from 'boom';
import Repository from '../data/repository';
import models from '../models/index';


const getAllDishes = function* (request, reply) {
  const dishesRepository = new Repository(models.dishes);
  try {
    const dishes = yield dishesRepository.getAll();
    return reply(dishes);
  } catch (error) {
    return reply(Boom.notAcceptable(`Error fetching dishes: ${error}`));
  }
};

const createDish = function* (request, reply) {
  const dishesRepository = new Repository(models.dishes);
  try {
    const createdDish = yield dishesRepository.create(request.payload);
    return reply(createdDish);
  } catch (error) {
    return reply(Boom.notAcceptable(`Error creating the dish: ${error}`));
  }
};

export default {
  getAllDishes,
  createDish,
};
