import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModuleOptions } from './options/config-module.options';
import { TypeOrmOptions } from './options/type-orm-module.options';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmOptions }),
  ],
})
export class AppModule {}
