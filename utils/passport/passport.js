const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

passport.use('oauth2', new OAuth2Strategy({

}, function (accessToken, refreshToken, profile, next) {

}));

module.exports = passport;
