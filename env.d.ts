declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    APP_PREFIX: string
    CORS_ALLOWED_ORIGIN: string

    BLUESKY_USERNAME: string
    BLUESKY_PASSWORD: string
    BLUESKY_SOCIAL_URL: string

    APIFY_API_TOKEN: string
    APIFY_FACEBOOK_ACTOR: string
  }
}
