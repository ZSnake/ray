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
              }),
            },
          },
        },
      },
    },
  },
];
