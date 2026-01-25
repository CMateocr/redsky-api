import Joi from 'joi'

interface ServerEnvVars {
  PORT: number
  APP_PREFIX: string
  CORS_ALLOWED_ORIGIN: string
}

export const serverSchema: Joi.StrictSchemaMap<ServerEnvVars> = {
  PORT: Joi.number(),
  APP_PREFIX: Joi.string().required(),
  CORS_ALLOWED_ORIGIN: Joi.string().required(),
}
