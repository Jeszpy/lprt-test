import { DefaultPagination } from './default.pagination';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { VacancySortByEnum } from '../../enums/pagination.enums';

const vacancySortByFields = Object.values(VacancySortByEnum);

export class VacanciesPagination extends DefaultPagination {
  @Transform(({ value }): string => {
    return vacancySortByFields.includes(value)
      ? value
      : VacancySortByEnum.CREATED_AT;
  })
  @IsOptional()
  public sortBy = VacancySortByEnum.CREATED_AT;
}
