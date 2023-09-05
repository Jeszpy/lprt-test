import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: IsUniqueEmailValidator.name, async: true })
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.userModel.findOneBy({ email });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Пользователь с таким email уже существует.';
  }
}
