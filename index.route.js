const router = require('express').Router();

const oauthRoutes = require('./server/api/oauth/oauth.route');

router.use('/oauth', oauthRoutes);

module.exports = router;
