const router = require('express').Router();
const logger = require('./server/helpers/logger');

router.get('/test', (req, res) => {
    res.json('ok');
});

module.exports = router;
