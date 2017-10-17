import Joi from 'joi';
import authController from '../controllers/authentication';

module.exports = [
  {
    method: 'POST',
    path: '/login',
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().max(20).min(6).required(),
        },
      },
      handler: {
        async: authController.login,
      },
      description: 'Login user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              token: Joi.string().required(),
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/test',
    config: {
      auth: 'jwt',
      handler: (request, reply) => reply('authenticated'),
    },
  },
];
