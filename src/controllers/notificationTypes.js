import Boom from 'boom';

import Repository from '../data/repository';
import models from '../models/index';

const getAllNotificationTypes = function* (request, reply) {
  const notificationTypesRepository = new Repository(models.ag_notificationTypes);
  try {
    const notificationTypes = yield notificationTypesRepository.getAll();
    return reply(notificationTypes);
  } catch (error) {
    return reply(Boom.notAcceptable('Error fetching notification types'));
  }
};

export default {
  getAllNotificationTypes,
};
