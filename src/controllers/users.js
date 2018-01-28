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
      where: {
        userId: request.params.userId,
      },
    });
    return reply(addresses);
  } catch (error) {
    return reply(boom.badRequest(`Could not get addresses: ${error}`));
  }
};

const getAddresses = async (request, reply) => {
  try {
    const addresses = models.address.findAll({
      raw: true,
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
    const deleteStatus = await models.address.destroy({
      where: {
        userId: request.params.userId,
      },
    });
    return reply({ deleteStatus, user });
  } catch (error) {
    return reply(boom.badRequest(`Could not remove user: ${error}`));
  }
};

const removeAddressesFromUser = async (request, reply) => {
  try {
    const deleteStatus = await models.address.destroy({
      where: {
        userId: request.params.userId,
      },
    });
    return reply(deleteStatus);
  } catch (error) {
    return reply(boom.badRequest(`Could not remove address from user: ${error}`));
  }
};

const updateAdressFromUser = async (request, reply) => {
  try {
    const address = models.address.update(request.payload, {
      where: {
        id: request.params.id,
        userId: request.params.userId,
      },
    });
    return reply(address);
  } catch (error) {
    return reply(boom.badRequest(`Could not update address to user: ${error}`));
  }
};

const removeAddressFromUser = async (request, reply) => {
  try {
    const deleteStatus = await models.address.destroy({
      where: {
        id: request.params.id,
        userId: request.params.userId,
      },
    });
    return reply(deleteStatus);
  } catch (error) {
    return reply(boom.badRequest(`Could not remove address from user: ${error}`));
  }
};

const updateUser = async (request, reply) => {
  try {
    const user = await models.user.update({
      email: request.payload.email,
      name: request.payload.name,
      updatedAt: Date.now(),
      type: request.payload.type !== '' ? request.payload.type : 'customer',
    }, {
      where: {
        id: request.params.id,
      },
      raw: true,
    });
    return reply(user);
  } catch (error) {
    return reply(boom.badData(`Could not update user: ${error}`));
  }
};

const updatePassword = async (request, reply) => {
  try {
    const hashedPassword = await bcrypt.hash(request.payload.password, 5);
    const user = await models.user.update({
      password: hashedPassword,
      updatedAt: Date.now(),
    }, {
      where: {
        id: request.params.id,
      },
      raw: true,
    });
    return reply(user);
  } catch (error) {
    return reply(boom.badData(`Could not update password: ${error}`));
  }
};

export default {
  createUser,
  addAddressToUser,
  getUserAddresses,
  getAddresses,
  getUsers,
  removeUser,
  removeAddressesFromUser,
  updateAdressFromUser,
  removeAddressFromUser,
  updateUser,
  updatePassword,
};
