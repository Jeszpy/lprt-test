import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 15)
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
