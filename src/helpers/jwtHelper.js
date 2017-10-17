import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

const issueToken = payload =>
  jwt.sign(payload, jwtConfig.key, { expiresIn: jwtConfig.expirationTime });

export default{
  issueToken,
};
