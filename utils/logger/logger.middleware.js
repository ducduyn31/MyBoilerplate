const logger = require('./index');

module.exports = function (options) {

    return (req, res, next) => {


        next();
    }
};
