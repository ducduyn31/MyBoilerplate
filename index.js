const mongoose = require('mongoose');
const logger = require('./server/helpers/logger');

// config should be imported before importing any other file
const config = require('config');
const app = require('./server/helpers/express');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = `mongodb://${config.get('mongo.host')}`;
mongoose.connect(mongoUri, {
  user: config.get('mongo.auth.username'),
  pass: config.get('mongo.auth.password'),
  server: { socketOptions: { keepAlive: 1 } },
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.info(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;
