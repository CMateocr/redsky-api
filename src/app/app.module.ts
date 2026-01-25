import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import socialConfig from '@config/namespaces/social.config'
import serverConfig from '@config/namespaces/server.config'
import { envValidationSchema } from '@config/validation/env-validation-schema'

import { AppService } from './app.service'
import { AppController } from './app.controller'

import { SocialModule } from '../social-feed/social.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/environments/${process.env.NODE_ENV || 'dev'}.env`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      isGlobal: true,
      cache: true,

      validationSchema: envValidationSchema,

      load: [socialConfig, serverConfig],
    }),

    SocialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
