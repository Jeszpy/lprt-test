import { IsOptional } from 'class-validator';
import { IsInteger } from '../../decorators/validation/is-integer.decorator';
import { Transform } from 'class-transformer';
import { SortDirectionEnum } from '../../enums/pagination.enums';

export const sortDirectionValues = Object.values(SortDirectionEnum);

export class DefaultPagination {
  @IsInteger(1, 1)
  @IsOptional()
  public pageNumber = 1;

  @IsInteger(10, 1)
  @IsOptional()
  public pageSize = 10;

  @Transform(({ value }) => {
    return sortDirectionValues.includes(value.toUpperCase())
      ? value.toUpperCase()
      : SortDirectionEnum.ASC;
  })
  @IsOptional()
  public sortDirection = SortDirectionEnum.ASC;

  public skip(): number {
    return (this.pageNumber - 1) * this.pageSize;
  }
}

export type TPagination<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};
