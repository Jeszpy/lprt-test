import { ArrayNotEmpty, IsArray, IsString, Length } from 'class-validator';

export class UpdateVacancyDto {
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
}
