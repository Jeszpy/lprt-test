import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsUniqueUserName } from '../../../decorators/validation/is-unique-user-name.decorator';
import { IsUniqueEmail } from '../../../decorators/validation/is-unique-email.decorator';
import { IsUniquePhone } from '../../../decorators/validation/is-unique-phone.decorator';

export class CreateUserDto {
  @IsUniqueUserName()
  @Length(3, 15)
  @IsString()
  userName: string;

  @IsUniqueEmail()
  @IsEmail()
  email: string;

  @IsUniquePhone()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
