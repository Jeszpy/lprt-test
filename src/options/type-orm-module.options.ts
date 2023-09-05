import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvVarsEnum } from '../enums/env-vars.enum';

@Injectable()
export class TypeOrmOptions implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get(EnvVarsEnum.DB_URL),
      autoLoadEntities: true,
      entities: ['dist/modules/**/entities/*.entity.ts'],
      synchronize: true,
    };
  }
}
