import Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { EnvVarsEnums, NodeEnvEnum } from '../enums/env-vars.enums';

export const ConfigModuleOptions = () => {
  const configService = new ConfigService();
  return {
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid(...Object.values(NodeEnvEnum))
        .required(),
      PORT: Joi.number().required(),
      DB_URL: Joi.string().required(),
    }),
    envFilePath: `.env.${configService.get(EnvVarsEnums.NODE_ENV)}`,
  };
};
