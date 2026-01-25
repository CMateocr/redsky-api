import { NestFactory } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'

import { AppModule } from './app/app.module'
import { setupApp } from './setup-app'

import serverConfig from '@config/namespaces/server.config'
import { ServerConfig } from '@config/types/server-config.type'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const serverConf = app.get<ServerConfig>(serverConfig.KEY)

  setupApp(app, serverConf)

  await app.listen(serverConf.port)
}

void bootstrap()
