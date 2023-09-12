import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Repository } from 'typeorm';
import {
  IVacancyCreateAttr,
  IVacancyViewModel,
  Vacancy,
} from './entities/vacancy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { VacanciesPagination } from '../../helpers/pagination/vacancies.pagination';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { TPagination } from '../../helpers/pagination/default.pagination';
import { VacancySortByEnum } from '../../enums/pagination.enums';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyModel: Repository<Vacancy>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  private getOrderBy(
    pagination: VacanciesPagination,
  ): FindOptionsOrder<Vacancy> {
    if (
      pagination.sortBy.toUpperCase() ===
      VacancySortByEnum.USER_NAME.toUpperCase()
    ) {
      return { publisher: { userName: pagination.sortDirection } };
    } else {
      return { [`${pagination.sortBy}`]: pagination.sortDirection };
    }
  }

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

  public async getAllVacancies(
    pagination: VacanciesPagination,
  ): Promise<TPagination<Vacancy>> {
    const [vacancies, count] = await this.vacancyModel.findAndCount({
      order: this.getOrderBy(pagination),
      skip: pagination.skip(),
      take: pagination.pageSize,
    });
    const pagesCount = Math.ceil(count / pagination.pageSize);
    return {
      pageSize: pagination.pageSize,
      page: pagination.pageNumber,
      pagesCount: pagesCount === 0 ? 1 : pagesCount,
      totalCount: count,
      items: vacancies,
    };
  }

  public async updateVacancyById(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<IVacancyViewModel> {
    const vacancy = await this.vacancyModel.findOneBy({ id });
    if (!vacancy) throw new NotFoundException();
    vacancy.title = updateVacancyDto.title;
    vacancy.shortDescription = updateVacancyDto.shortDescription;
    vacancy.skills = updateVacancyDto.skills;
    const updatedVacancy = await this.vacancyModel.save(vacancy);
    return updatedVacancy.getViewModel();
  }
}
