import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUniqueUserNameValidator } from '../../validators/is-unique-user-name.validator';
import { IsUniqueEmailValidator } from '../../validators/is-unique-email.validator';
import { IsUniquePhoneValidator } from '../../validators/is-unique-phone.validator';

const validators = [
  IsUniqueUserNameValidator,
  IsUniqueEmailValidator,
  IsUniquePhoneValidator,
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ...validators],
})
export class UsersModule {}
