const logger = require('./index');

module.exports = function (options) {

    return (req, res, next) => {

        logger.info('test');

        next();
    }
};
