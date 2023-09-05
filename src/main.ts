import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVarsEnum } from './enums/env-vars.enum';
import { addSettingsToApp } from './helpers/add-settings-to-app';

async function bootstrap() {
  const logger = new Logger('BOOTSTRAP');
  try {
    logger.verbose('Application start up');
    const initialApp: INestApplication = await NestFactory.create(AppModule);
    const app: INestApplication = addSettingsToApp(initialApp);
    const configService: ConfigService = app.get(ConfigService);
    const port: number = parseInt(configService.get(EnvVarsEnum.PORT), 10);
    await app.listen(port, () =>
      logger.verbose(`Application successfully launched on port ${port}`),
    );
  } catch (e) {
    logger.error(e);
  }
}
bootstrap();
