import models from '../models/';

const validateUser = (decoded, request, callback) => {
  const userId = decoded.id;
  const userEmail = decoded.email;
  models.user.findOne({
    attributes: ['*'],
    where: {
      id: userId,
      email: userEmail,
    },
  })
    .then(response => callback(null, response !== undefined && response !== null))
    .catch((error) => {
      throw new Error(`Couldnt find user: ${error}`);
    });
};

export default {
  validateUser,
};
