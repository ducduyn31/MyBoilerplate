const router = require('express').Router();

const oauthRoutes = require('./components/oauth/oauth.route');

router.use('/oauth', oauthRoutes);

module.exports = router;
