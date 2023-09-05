import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: IsUniqueUserNameValidator.name, async: true })
export class IsUniqueUserNameValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async validate(userName: string): Promise<boolean> {
    const user = await this.userModel.findOneBy({ userName });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Пользователь с таким именем уже существует.';
  }
}
