import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { User } from '../users/entities/user.entity';
import { IsPublisherExistsValidator } from '../../validators/is-publisher-exists.validator';

const validators = [IsPublisherExistsValidator];
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy, User])],
  controllers: [VacanciesController],
  providers: [VacanciesService, ...validators],
})
export class VacanciesModule {}
