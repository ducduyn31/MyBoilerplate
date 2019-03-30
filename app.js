global.Promise = require('bluebird');

const app = require('./server/helpers/express');
const db = require('./server/helpers/mongoose');
const transformer = require('transformer').middleware;

db.connect();

require('./seeds');

/*
 *  Middlewares register
 *
 */

app.use(transformer);

const logger = require('./server/helpers/logger/logger.middleware');

app.use(logger());

app.use('/', require('./index.route'));

require('./server/helpers/errors/errorHandler');

module.exports = app;
