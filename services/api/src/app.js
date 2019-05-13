const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const useragent = require('express-useragent');
const log = new (require('/var/lib/core/js/log'))(module);
const { graphqlExpress } = require('apollo-server-express');
const { createServer } = require('http');
const schema = require('./api/controllers/');
const errorHandler = require('./api/helpers/error');

let server;

process.env.MODELS_PATH = path.join(`${__dirname}/`, 'api/models');
process.env.CONTROLLERS_PATH = path.join(`${__dirname}/`, 'api/controllers');
process.env.HELPERS_PATH = path.join(`${__dirname}/`, 'api/helpers');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.options('/*', (req, res) => {
  /* istanbul ignore next */
  res.header('Access-Control-Allow-Origin', '*');
  /* istanbul ignore next */
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  /* istanbul ignore next */
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  /* istanbul ignore next */
  res.sendStatus(200);
});

app.use(multer({ dest: './uploads/' }).any());

app.enable('trust proxy');

app.use('/public', express.static('public'));

/* istanbul ignore next */
function initServer() {
  return new Promise(resolve => {
    app.use(useragent.express());
    app.use(bodyParser.json());
    app.use(require('./api/middleware/log'));

    app.use('/api/v1/graphql',
      graphqlExpress( req => ({
        schema,
        context: req,
        formatError: error => {
          const data = error.originalError || error;

          return {
            message: data.message,
            path: data.path,
            code: data.code
          };
        }
      })));

    app.use((err, req, res, next) => errorHandler.handleResponse('Session', err, req.guid, res, next));

    server = createServer(app);
    server.listen(port);

    log.message(`Server listening on port ${port}`, {}, 'App');

    return resolve();
  });
}

/* istanbul ignore next */
function shutdown() {
  server.forceShutdown = () => new Promise(resolve => server.close(() => resolve()));

  return Promise.resolve()
    .then(() => server.forceShutdown())
    .then(() => log.message('Shutdown completed', {}, 'App'))
    .catch(err => log.error(err, '', { message: 'Shutdown error' }));
}

/* istanbul ignore next */
const initPromise = Promise.resolve()
  .then(() => initServer())
  .catch(err => {
    log.error(err, '', { message: 'Unable to initialize server' });
    /* eslint no-process-exit: 0 */
    shutdown().then(() => process.exit(1));
  });

module.exports = {
  initPromise,
  shutdown,
  server
};
