import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common'

import { URL } from 'url'

import { AtpAgent, CredentialSession } from '@atproto/api'

import { type SocialConfig } from '@config/types/social-config.type'
import socialConfig from '@config/namespaces/social.config'

import { IIdentityProvider } from '@social/domain/services/identity.provider'

@Injectable()
export class BlueskyProvider implements OnModuleInit, IIdentityProvider {
  private readonly _blskAgent: AtpAgent

  constructor(
    @Inject(socialConfig.KEY)
    private readonly _socialConfig: SocialConfig,
  ) {
    const credentialSession: CredentialSession = new CredentialSession(
      new URL(this._socialConfig.bluesky.socialUrl),
    )

    this._blskAgent = new AtpAgent(credentialSession)
  }

  async resolveHandle(handle: string): Promise<string> {
    try {
      const response = await this.blskAgent.resolveHandle({ handle })

      return response.data.did
    } catch (error) {
      throw new NotFoundException(`User not found: ${handle}`)
    }
  }

  async onModuleInit(): Promise<void> {
    await this.connectToBluesky()
  }

  private async connectToBluesky(): Promise<void> {
    await this._blskAgent.login({
      identifier: this._socialConfig.bluesky.username,
      password: this._socialConfig.bluesky.password,
    })
  }

  get blskAgent(): AtpAgent {
    if (!this._blskAgent.session)
      throw new InternalServerErrorException('no se pudo activar la sesion de blue sky')

    return this._blskAgent
  }
}
