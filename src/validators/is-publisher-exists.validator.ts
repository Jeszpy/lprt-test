import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: IsPublisherExistsValidator.name, async: true })
export class IsPublisherExistsValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async validate(id: string): Promise<boolean> {
    const user = await this.userModel.findOneBy({ id });
    return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Пользователь с таким id не существует.';
  }
}
