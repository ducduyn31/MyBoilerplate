const router = require('express').Router();
const oauthCtrl = require('./oauth.controller');

router.get('/callback', oauthCtrl.callback);

module.exports = router;
