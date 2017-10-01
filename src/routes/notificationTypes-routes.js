import co from 'co';
import Joi from 'joi';

import notificationTypesController from '../controllers/notificationTypes';

module.exports = [
  {
    method: 'GET',
    path: '/notificationtypes',
    config: {
      handler: {
        async: co.wrap(notificationTypesController.getAllNotificationTypes),
      },
      description: 'Get all notification Types',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items({
                dataValues: Joi.object({
                  id: Joi.string().required(),
                  notificationTypeName: Joi.string().required(),
                  user_ids: Joi.string(),
                  group_ids: Joi.string(),
                }),
              }),
            },
          },
        },
      },
    },
  },
];
