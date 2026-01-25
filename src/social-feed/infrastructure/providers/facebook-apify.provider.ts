import { Inject, Injectable } from '@nestjs/common'

import { ActorClient, ApifyClient } from 'apify-client'

import type { SocialConfig } from '@config/types/social-config.type'
import socialConfig from '@config/namespaces/social.config'

@Injectable()
export class FacebookApifyProvider {
  private readonly _client: ApifyClient

  constructor(@Inject(socialConfig.KEY) private readonly _socialConfig: SocialConfig) {
    this._client = new ApifyClient({ token: this._socialConfig.facebookApify.token })
  }

  get actorClient(): ActorClient {
    return this._client.actor(this._socialConfig.facebookApify.actor)
  }

  get client(): ApifyClient {
    return this._client
  }
}
