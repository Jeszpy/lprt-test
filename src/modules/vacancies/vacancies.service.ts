import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  public async createVacancy(createVacancyDto: CreateVacancyDto) {
    return 'This action adds a new vacancy';
  }

  public async getAllVacancies() {
    return `This action returns all vacancies`;
  }

  public async updateVacancyById(
    id: number,
    updateVacancyDto: UpdateVacancyDto,
  ) {
    return `This action updates a #${id} vacancy`;
  }
}
