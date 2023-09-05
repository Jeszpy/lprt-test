import { CreateUserDto } from '../../src/modules/users/dto/create-user.dto';
import request from 'supertest';
import { endpoints } from '../endpoints';

export class UsersTestingFactory {
  constructor(private readonly server: any) {}

  public async createUser(dto: CreateUserDto): Promise<request.Response> {
    return request(this.server).post(endpoints.users).send(dto);
  }

  public async getAllUsers(): Promise<request.Response> {
    return request(this.server).get(endpoints.users).send();
  }
}
