import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import { GlobalValidationPipe } from '../pipes';
import { HttpExceptionFilter } from '../exception-filters';

export const addSettingsToApp = (app: INestApplication): INestApplication => {
  app.useGlobalPipes(GlobalValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  return app;
};
