import { readFileSync } from 'fs'
import { join } from 'path'

import { INestApplication, ValidationPipe } from '@nestjs/common'

import { ServerConfig } from '@config/types/server-config.type'
import { validationConfig } from '@config/validation/validation.config'

export const setupApp = (app: INestApplication, serverConfig: ServerConfig): void => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  )

  process.env.API_VERSION = packageJson.version

  app.setGlobalPrefix(serverConfig.appPrefix)

  app.useGlobalPipes(new ValidationPipe(validationConfig))

  app.enableCors({
    origin: serverConfig.corsAllowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
}
