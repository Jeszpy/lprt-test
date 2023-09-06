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
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.createVacancy(createVacancyDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.vacanciesService.getAllVacancies();
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacanciesService.updateVacancyById(+id, updateVacancyDto);
  }
}
