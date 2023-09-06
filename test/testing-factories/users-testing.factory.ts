import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';
import request from 'supertest';
import { endpoints } from '../endpoints';
import { faker } from '@faker-js/faker';
import { User } from '../../src/modules/users/entities/user.entity';

export class UsersTestingFactory {
  constructor(private readonly server: any) {}

  public getValidInputData(): CreateUserDto {
    return {
      userName: faker.string.sample({ min: 3, max: 15 }),
      email: faker.internet.email(),
      phone: faker.phone.number('+48 91 ### ## ##'),
    };
  }
  public async createUserRawReq(dto: CreateUserDto): Promise<request.Response> {
    return request(this.server).post(endpoints.users).send(dto);
  }

  public async createUsers(count: number): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      const inputData = this.getValidInputData();
      const res = await this.createUserRawReq(inputData);
      users.push(res.body);
    }
    return users;
  }

  public async getAllUsers(): Promise<request.Response> {
    return request(this.server).get(endpoints.users).send();
  }
}
