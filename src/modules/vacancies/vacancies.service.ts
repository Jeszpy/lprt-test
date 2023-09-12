import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Repository } from 'typeorm';
import { Vacancy, IVacancyCreateAttr } from './entities/vacancy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyModel: Repository<Vacancy>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}
  public async createVacancy(createVacancyDto: CreateVacancyDto) {
    const publisher = await this.userModel.findOneBy({
      id: createVacancyDto.publisherId,
    });
    const dataForCreate: IVacancyCreateAttr = {
      title: createVacancyDto.title,
      shortDescription: createVacancyDto.shortDescription,
      skills: createVacancyDto.skills,
      publisher,
    };
    const newVacancy: Vacancy = this.vacancyModel.create(dataForCreate);
    await this.vacancyModel.save(newVacancy);
    return newVacancy.getViewModel();
  }

  public async getAllVacancies(): Promise<Vacancy[]> {
    return this.vacancyModel.find();
  }

  public async updateVacancyById(
    id: number,
    updateVacancyDto: UpdateVacancyDto,
  ) {
    return `This action updates a #${id} vacancy`;
  }
}
