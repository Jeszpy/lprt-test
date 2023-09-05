import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVarsEnum } from './enums/env-vars.enum';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const logger = new Logger('BOOTSTRAP');
  try {
    logger.verbose('Application start up');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = parseInt(configService.get(EnvVarsEnum.PORT), 10);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
      }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.listen(port, () =>
      logger.verbose(`Application successfully launched on port ${port}`),
    );
  } catch (e) {
    logger.error(e);
  }
}
bootstrap();
