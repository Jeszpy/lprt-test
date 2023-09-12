import request from 'supertest';
import { endpoints } from '../endpoints';
import { CreateVacancyDto } from '../../src/modules/vacancies/dto/create-vacancy.dto';
import { faker } from '@faker-js/faker';

export class VacanciesTestingFactory {
  constructor(private readonly server: any) {}

  // public getValidInputData(): CreateUserDto {
  //   return {
  //     userName: faker.string.sample({ min: 3, max: 15 }),
  //     email: faker.internet.email(),
  //     phone: faker.phone.number('+48 91 ### ## ##'),
  //   };
  // }
  public async createVacancyRawReq(
    dto: CreateVacancyDto,
  ): Promise<request.Response> {
    return request(this.server).post(endpoints.vacancies).send(dto);
  }

  // public async createUsers(count: number): Promise<User[]> {
  //   const users: User[] = [];
  //   for (let i = 0; i < count; i++) {
  //     const inputData = this.getValidInputData();
  //     const res = await this.createUserRawReq(inputData);
  //     users.push(res.body);
  //   }
  //   return users;
  // }

  public async getAllVacancies(filterQuery: string): Promise<request.Response> {
    // const url = `${endpoints.vacancies}?${filterQuery}`
    const url = endpoints.vacancies + '?' + filterQuery;
    return request(this.server).get(url).send();
  }

  getValidInputData(publisherId: string): CreateVacancyDto {
    return {
      title: faker.string.sample({ min: 5, max: 30 }),
      shortDescription: faker.string.sample({ min: 25, max: 300 }),
      skills: Array.from(
        { length: faker.number.int({ max: 10 }) },
        faker.person.jobType,
      ),
      publisherId,
    };
  }
}
