import serverConfig from '@config/namespaces/server.config'
import { ConfigType } from '@nestjs/config'

export type ServerConfig = ConfigType<typeof serverConfig>
