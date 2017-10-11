import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiAsyncHandler from 'hapi-async-handler';
import 'babel-core/register';
import 'babel-polyfill';

import routes from './src/routes/routes';


const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
});


server.register([Inert, Vision, HapiAsyncHandler], (err) => {
  if (err) {
    console.error('Error running application: ', err);
    return;
  }
  server.route(routes);
  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });
});
