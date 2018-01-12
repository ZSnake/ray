import Joi from 'joi';
import usersController from '../controllers/users';

module.exports = [
  {
    method: 'POST',
    path: '/register',
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          name: Joi.string().required(),
          password: Joi.string().max(20).min(6).required(),
          type: Joi.string().allow(''),
        },
      },
      handler: {
        async: usersController.createUser,
      },
      description: 'Create new user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              user: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                type: Joi.string().required(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users',
    config: {
      auth: 'jwt',
      handler: {
        async: usersController.getUsers,
      },
      description: 'Get all users',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              users: Joi.array().items(
                Joi.object({
                  id: Joi.string().required(),
                  name: Joi.string().required(),
                  email: Joi.string().required(),
                  type: Joi.string().required(),
                }),
              ),
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/user/{userId}',
    config: {
      handler: {
        async: usersController.removeUser,
      },
      description: 'Remove user by id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              user: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                type: Joi.string().required(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/user/{userId}/addresses',
    config: {
      auth: 'jwt',
      handler: {
        async: usersController.getUserAddresses,
      },
      description: 'Get all addresses for a user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              addresses: Joi.array().items(
                Joi.object({
                  userId: Joi.number().required(),
                  colony: Joi.string().required(),
                  city: Joi.string().required(),
                  department: Joi.string().allow(),
                  phone: Joi.string().allow(),
                  celphone: Joi.string().allow(),
                  street: Joi.string().allow(),
                  block: Joi.string().allow(),
                  house: Joi.string().allow(),
                  reference: Joi.string().allow(),
                }),
              ),
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/user/{userId}/address',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          userId: Joi.number().required(),
        },
        payload: {
          colony: Joi.string().required(),
          city: Joi.string().required(),
          department: Joi.string().allow(),
          phone: Joi.string().allow(),
          celphone: Joi.string().allow(),
          street: Joi.string().allow(),
          block: Joi.string().allow(),
          house: Joi.string().allow(),
          reference: Joi.string().allow(),
        },
      },
      handler: {
        async: usersController.addAddressToUser,
      },
      description: 'Add address to user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                userId: Joi.number().required(),
                colony: Joi.string().required(),
                city: Joi.string().required(),
                department: Joi.string().allow(),
                phone: Joi.string().allow(),
                celphone: Joi.string().allow(),
                street: Joi.string().allow(),
                block: Joi.string().allow(),
                house: Joi.string().allow(),
                reference: Joi.string().allow(),
              }),
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/user/{userId}/address',
    config: {
      auth: 'jwt',
      validate: {
        params: {
          userId: Joi.number().required(),
        },
      },
      handler: {
        async: usersController.removeAddressFromUser,
      },
      description: 'Remove address from user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                userId: Joi.number().required(),
                colony: Joi.string().required(),
                city: Joi.string().required(),
                department: Joi.string().allow(),
                phone: Joi.string().allow(),
                celphone: Joi.string().allow(),
                street: Joi.string().allow(),
                block: Joi.string().allow(),
                house: Joi.string().allow(),
                reference: Joi.string().allow(),
              }),
            },
          },
        },
      },
    },
  },
];
