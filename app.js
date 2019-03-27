global.Promise = require('bluebird');

const app = require('./utils/express');
const db = require('./utils/mongoose');

db.connect();

require('./seeds');

/*
 *  Middlewares register
 *
 */
const transformer = require('transformer').middleware;
app.use(transformer);

app.use('/', require('./index.route'));

require('./utils/errors/errorHandler');

module.exports = app;
