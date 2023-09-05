import Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { EnvVarsEnum, NodeEnvEnum } from '../enums/env-vars.enum';

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
    envFilePath: `.env.${configService.get(EnvVarsEnum.NODE_ENV)}`,
  };
};
