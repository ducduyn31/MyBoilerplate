const logger = require('./index');
const _ = require('lodash');

module.exports = options => {
  const { enabledHeaders } = options || {};
  return (req, res, next) => {
    const { headers, body } = req;
    logger.info({
      body,
      headers: _.pickBy(headers, k => _.includes(enabledHeaders, k)),
    });

    next();
  };
};
