import bcrypt from 'bcrypt';
import boom from 'boom';
import models from '../models/';

const createUser = async (request, reply) => {
  try {
    const hashedPassword = await bcrypt.hash(request.payload.password, 5);
    const user = await models.user.create({
      email: request.payload.email,
      name: request.payload.name,
      password: hashedPassword,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: request.payload.type !== '' ? request.payload.type : 'customer',

    }, {
      raw: true,
    });
    delete user.dataValues.password;
    return reply(user);
  } catch (error) {
    return reply(boom.badData(`Could not create user: ${error}`));
  }
};

const addAddressToUser = async (request, reply) => {
  try {
    const address = models.address.create({
      ...request.payload,
      userId: request.params.userId,
    });
    return reply(address);
  } catch (error) {
    return reply(boom.badRequest(`Could not add address to user: ${error}`));
  }
};

const getUserAddresses = async (request, reply) => {
  try {
    const addresses = models.address.findAll({
      userId: request.params.userId,
    });
    return reply(addresses);
  } catch (error) {
    return reply(boom.badRequest(`Could not get addresses: ${error}`));
  }
};

const getUsers = async (request, reply) => {
  try {
    const users = models.user.findAll({
      raw: true,
    }).map((rawUser) => {
      const user = rawUser;
      delete user.password;
      return user;
    });
    return reply(users);
  } catch (error) {
    return reply(boom.badRequest(`Could not get users lists: ${error}`));
  }
};

const removeUser = async (request, reply) => {
  try {
    const user = await models.user.findOne({
      where: {
        id: request.params.userId,
      },
    });
    await models.user.destroy({
      where: {
        id: request.params.userId,
      },
    });
    return reply(user);
  } catch (error) {
    return reply(boom.badRequest(`Could not remove user: ${error}`));
  }
};

export default {
  createUser,
  addAddressToUser,
  getUserAddresses,
  getUsers,
  removeUser,
};