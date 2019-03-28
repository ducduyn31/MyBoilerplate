const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

/**
 * Get the mongo uri of the provided database (default database in config
 * file) with configuration from mongo config.
 *
 * @param database
 * @returns {string}
 */
const resolveMongoUrl = (database = null) => {
    let result = 'mongodb://@{AUTH}@{HOST}@{PORT}/@{DB}';
    if (config.get('mongo.auth.activate')) {
        let username = config.get('mongo.auth.username');
        let password = config.get('mongo.auth.password');
        result = result.replace('@{AUTH}', username + ':' + password + '@')
    } else result = result.replace('@{AUTH}', '');

    result = result.replace('@{HOST}', config.get('mongo.host') || 'localhost');

    result = result.replace('@{PORT}', ':' + (config.get('mongo.port') || 27017));

    let dbPath = database ? `mongo.database.${database}` : 'mongo.database.default';

    result = result.replace('@{DB}', config.get(dbPath));

    return result;
};

// On Error listener
const onError = (reason) => {
    logger.error(reason);
};

//  Change mongoose Promise type
mongoose.Promise = require('bluebird');

module.exports.connect = () => {
    mongoose.connect(resolveMongoUrl(), {
        autoIndex: true,
        useNewUrlParser: true,
        keepAlive: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).catch(reason => onError(reason));
    return mongoose.connection;
};
