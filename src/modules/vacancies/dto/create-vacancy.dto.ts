import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { IsPublisherExists } from '../../../decorators/validation/is-publisher-exists.decorator';

export class CreateVacancyDto {
  @Length(5, 30)
  @IsString()
  title: string;

  @Length(25, 300)
  @IsString()
  shortDescription: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  skills: string[];

  @IsPublisherExists()
  @IsUUID()
  publisherId: string;
}
