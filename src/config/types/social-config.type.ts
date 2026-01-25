import socialConfig from '@config/namespaces/social.config'
import { ConfigType } from '@nestjs/config'

export type SocialConfig = ConfigType<typeof socialConfig>
