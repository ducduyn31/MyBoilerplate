const axios = require('axios/index').default.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});
const qs = require('querystring');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../users/user.model');
const ApiError = require('../../helpers/errors/APIError');
const TokenTransformer = require('./token.transformer');

const callback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (code) {
      let responseData = await axios.post(
        config.get('oauth.tokenUrl'),
        qs.stringify({
          code,
          grant_type: 'authorization_code',
          redirect_uri: config.get('oauth.redirectUri'),
        }),
        {
          auth: {
            username: config.get('oauth.clientId'),
            password: config.get('oauth.clientSecret'),
          },
        },
      );

      const { access_token, refresh_token, expires_in } = responseData.data;

      responseData = await axios.get(`${config.get('oauth.resourceUrl')}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const { name, email } = responseData.data.data.user;

      if (!email) throw new ApiError('User Not Found', 400, true);

      const user = await User.findOneOrCreate(
        { email },
        {
          name,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date() + expires_in,
        },
      );

      const token = jwt.sign(
        {
          user: user._id,
        },
        config.get('local.jwtSecret'),
      );

      res.transformer.item(token, new TokenTransformer()).dispatch();
    } else {
      res.transformer.errorUnauthorized('Invalid Authorization Code');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { callback };
