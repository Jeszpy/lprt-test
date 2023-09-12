import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vacancy])],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
