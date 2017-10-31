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

export default {
  createUser,
};
