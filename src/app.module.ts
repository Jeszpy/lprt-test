import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModuleOptions } from './options/config-module.options';
import { TypeOrmOptions } from './options/type-orm-module.options';
import { UsersModule } from './modules/users/users.module';
import { TestingModule } from './modules/testing/testing.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmOptions }),
    UsersModule,
    VacanciesModule,
    TestingModule,
  ],
})
export class AppModule {}
