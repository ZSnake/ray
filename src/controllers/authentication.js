
import bcrypt from 'bcrypt';
import boom from 'boom';
import models from '../models/';
import jwtHelper from '../helpers/jwtHelper';

const login = async (request, reply) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: request.payload.email,
      },
    },
    {
      raw: true,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(request.payload.password, user.password);
      if (passwordMatch) {
        const token = jwtHelper.issueToken({ id: user.id, email: user.email });
        return reply(
          {
            id: user.id,
            email: user.email,
            token,
            type: user.type,
          },
        );
      }
      return reply(boom.unauthorized('Wrong password'));
    }
    return reply(boom.unauthorized('Wrong Username'));
  } catch (error) {
    return reply(boom.badData(`Could not retreive user: ${error}`));
  }
};

export default {
  login,
};
