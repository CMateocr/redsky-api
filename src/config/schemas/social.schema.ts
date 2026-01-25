import Joi from 'joi'

interface SocialEnvVars {
  BLUESKY_USERNAME: string
  BLUESKY_PASSWORD: string
  APIFY_API_TOKEN: string
}

export const socialSchema: Joi.StrictSchemaMap<SocialEnvVars> = {
  BLUESKY_PASSWORD: Joi.string().required(),
  BLUESKY_USERNAME: Joi.string().required(),
  APIFY_API_TOKEN: Joi.string().required(),
}
