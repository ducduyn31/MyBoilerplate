const router = require('express').Router();
const logger = require('./server/helpers/logger');

router.get('/test', (req, res) => {
  logger.resource('self', 'test');
  res.json('test');
});

module.exports = router;
