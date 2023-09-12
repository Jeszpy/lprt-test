import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { IVacancyViewModel, Vacancy } from './entities/vacancy.entity';
import { VacanciesPagination } from '../../helpers/pagination/vacancies.pagination';
import { TPagination } from '../../helpers/pagination/default.pagination';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createVacancyDto: CreateVacancyDto,
  ): Promise<IVacancyViewModel> {
    return this.vacanciesService.createVacancy(createVacancyDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() pagination: VacanciesPagination,
  ): Promise<TPagination<Vacancy>> {
    return this.vacanciesService.getAllVacancies(pagination);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<IVacancyViewModel> {
    return this.vacanciesService.updateVacancyById(id, updateVacancyDto);
  }
}
