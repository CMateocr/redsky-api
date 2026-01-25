import { registerAs } from '@nestjs/config'

export default registerAs('social', () => ({
  facebookApify: {
    token: process.env.APIFY_API_TOKEN,
    actor: process.env.APIFY_FACEBOOK_ACTOR,
  },
  bluesky: {
    username: process.env.BLUESKY_USERNAME,
    password: process.env.BLUESKY_PASSWORD,
    socialUrl: process.env.BLUESKY_SOCIAL_URL,
  },
}))
