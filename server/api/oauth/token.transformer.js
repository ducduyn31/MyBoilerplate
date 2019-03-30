const AbstractTransformer = require('transformer').AbstractTransformer;

class TokenTransformer extends AbstractTransformer {
  transform(token) {
    return {
      token,
      expiresAt: TokenTransformer._extractJwtPayload(token).iat,
    };
  }

  static _extractJwtPayload(code) {
    const parts = code.split('.');
    return JSON.parse(Buffer.from(parts[1], 'base64').toString());
  }
}

module.exports = TokenTransformer;
