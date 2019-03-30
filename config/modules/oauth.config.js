const Joi = require('joi');

const envVarsSchema = Joi.object({
  TOKEN_URL: Joi.string(),
  REDIRECT: Joi.string(),
  RESOURCE_URL: Joi.string(),
  CLIENT_ID: Joi.string(),
  CLIENT_SECRET: Joi.string(),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  tokenUrl: envVars.TOKEN_URL,
  redirectUri: envVars.REDIRECT,
  resourceUrl: envVars.RESOURCE_URL,
  clientId: envVars.CLIENT_ID,
  clientSecret: envVars.CLIENT_SECRET,
};

module.exports = config;
