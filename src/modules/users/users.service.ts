import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const newUser = this.userModel.create(dto);
    return this.userModel.save(newUser);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
