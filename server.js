import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import 'babel-core/register';
import 'babel-polyfill';
import HapiAsyncHandler from 'hapi-async-handler';
import Jwt from 'hapi-auth-jwt2';
import jwtConfig from './src/config/jwtConfig.js';
import authHelper from './src/helpers/authenticationHelper';

import routes from './src/routes/routes';


const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
});


server.register([Inert, Vision, HapiAsyncHandler, Jwt], (err) => {
  if (err) {
    console.error('Error running application: ', err);
    return;
  }

  server.auth.strategy('jwt', 'jwt',
  { key: jwtConfig.key,
    validateFunc: authHelper.validateUser,
    verifyOptions: {
      ignoreExpiration: false,
      algorithms: [ 'HS256' ]
    }
  });

  server.route(routes);
  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });
});
