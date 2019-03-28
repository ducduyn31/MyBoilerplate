const logger = require('./extremeLogger');
const _ = require('lodash');

module.exports = {
    info(message, ...optionalParams) {
        logger.info({
            msg: message
        });
    },
    resource(from, to, resource, censor = []) {
        const msg = _.pickBy(resource, key => !_.includes(censor, key));
        logger.info({
            from,
            to,
            msg,
        });
    }
};
