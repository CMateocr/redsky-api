// src/config/env.validation.ts
import * as Joi from 'joi'

import { serverSchema } from '@config/schemas/server.schema'
import { socialSchema } from '@config/schemas/social.schema'

export const envValidationSchema = Joi.object()
  .append(serverSchema as Joi.SchemaMap)
  .append(socialSchema as Joi.SchemaMap)
