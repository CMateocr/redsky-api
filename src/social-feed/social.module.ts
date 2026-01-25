import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import socialConfig from '@config/namespaces/social.config'

import { BlueskyProvider } from './infrastructure/providers/bluesky.provider'
import { BlueskyService } from './infrastructure/services/bluesky.service.impl'

import { BlueskyUsecase } from './application/bluesky.use-case'

import { IBlueskyServiceToken } from './domain/services/bluesky.service'

import { SocialController } from './interface/controller/social.controller'
import { BlueskyMapper } from './infrastructure/mappers/bluesky.mapper'
import { IIdentityProviderToken } from './domain/services/identity.provider'
import { FacebookApifyProvider } from './infrastructure/providers/facebook-apify.provider'
import { IFacebookApifyServiceToken } from './domain/services/facebook-apify.service'
import { FacebookApifyService } from './infrastructure/services/facebook-apify.service.impl'
import { FacebookApifyMapper } from './infrastructure/mappers/facebook-apify.mapper'
import { FacebookApifyUsecase } from './application/facebook-apify.use-case'

@Module({
  imports: [ConfigModule.forFeature(socialConfig)],

  providers: [
    BlueskyProvider,

    {
      provide: IBlueskyServiceToken,
      useClass: BlueskyService,
    },
    {
      provide: IIdentityProviderToken,
      useExisting: BlueskyProvider,
    },
    {
      provide: IFacebookApifyServiceToken,
      useClass: FacebookApifyService,
    },

    BlueskyUsecase,

    BlueskyMapper,
    FacebookApifyUsecase,
    FacebookApifyMapper,
    FacebookApifyProvider,
  ],

  exports: [],

  controllers: [SocialController],
})
export class SocialModule {}
