import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: IsUniquePhoneValidator.name, async: true })
export class IsUniquePhoneValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async validate(phone: string): Promise<boolean> {
    const user = await this.userModel.findOneBy({ phone });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Пользователь с таким номером телефона уже существует.';
  }
}
