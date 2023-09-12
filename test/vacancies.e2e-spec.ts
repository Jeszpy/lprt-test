import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { addSettingsToApp } from '../src/helpers/add-settings-to-app';
import { UsersTestingFactory } from './testing-factories/users-testing.factory';
import { endpoints } from './endpoints';
import { CreateUserDto } from '../src/modules/users/dto/create-user.dto';
import { badReqErrorsGenerator } from './test-helpers';
import { faker } from '@faker-js/faker';
import { VacanciesTestingFactory } from './testing-factories/vacancies-testing.factory';
import { CreateVacancyDto } from '../src/modules/vacancies/dto/create-vacancy.dto';
import { randomUUID } from 'crypto';
import {
  IVacancyViewModel,
  Vacancy,
} from '../src/modules/vacancies/entities/vacancy.entity';

describe('Vacancies e2e tests', () => {
  let app: INestApplication;
  let server: any;
  let usersFactory: UsersTestingFactory;
  let vacanciesFactory: VacanciesTestingFactory;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = addSettingsToApp(app);
    server = app.getHttpServer();
    usersFactory = new UsersTestingFactory(server);
    vacanciesFactory = new VacanciesTestingFactory(server);
    await app.init();
  });

  describe('create vacancy tests', () => {
    it('should wipe all data before test', async () => {
      const res = await request(server)
        .delete(endpoints.testing.wipeAllData)
        .send();

      expect(res.status).toBe(HttpStatus.NO_CONTENT);

      const vacanciesRes = await vacanciesFactory.getAllVacancies('');
      expect(vacanciesRes.status).toBe(HttpStatus.OK);
      expect(vacanciesRes.body).toHaveLength(0);
    });

    it('send empty body => should return 400 status code and validation errors', async () => {
      const emptyData = {} as CreateVacancyDto;
      const errors = badReqErrorsGenerator([
        'title',
        'shortDescription',
        'skills',
        'publisherId',
      ]);
      const res = await vacanciesFactory.createVacancyRawReq(emptyData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('sending empty strings in object fields => should return 400 status code and validation errors', async () => {
      const emptyStringsData: CreateVacancyDto = {
        title: '',
        shortDescription: '',
        skills: [],
        publisherId: '',
      };
      const errors = badReqErrorsGenerator([
        'title',
        'shortDescription',
        'skills',
        'publisherId',
      ]);
      const res = await vacanciesFactory.createVacancyRawReq(emptyStringsData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('iterate over string lengths => should return 400 status code and validation errors', async () => {
      const invalidData: CreateVacancyDto = {
        title: faker.lorem.paragraphs(10),
        shortDescription: faker.lorem.paragraphs(100),
        skills: [1, { any: 'data' }] as any,
        publisherId: randomUUID(),
      };
      const errors = badReqErrorsGenerator([
        'title',
        'shortDescription',
        'skills',
        'publisherId',
      ]);
      const res = await vacanciesFactory.createVacancyRawReq(invalidData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('input of correct data => should return 201 status code and created vacancy', async () => {
      const [user] = await usersFactory.createUsers(1);
      const vacanciesResBeforeCreate = await vacanciesFactory.getAllVacancies(
        '',
      );
      expect(vacanciesResBeforeCreate.status).toBe(HttpStatus.OK);
      expect(vacanciesResBeforeCreate.body).toHaveLength(0);

      const correctData: CreateVacancyDto = vacanciesFactory.getValidInputData(
        user.id,
      );

      const res = await vacanciesFactory.createVacancyRawReq(correctData);

      expect(res.status).toBe(HttpStatus.CREATED);
      const createdVacancy = res.body;
      expect(createdVacancy).toStrictEqual(<IVacancyViewModel>{
        id: expect.any(String),
        title: correctData.title,
        shortDescription: correctData.shortDescription,
        skills: correctData.skills,
        publisher: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      const vacanciesResAfterCreate = await vacanciesFactory.getAllVacancies(
        '',
      );
      expect(vacanciesResAfterCreate.status).toBe(HttpStatus.OK);
      expect(vacanciesResAfterCreate.body).toHaveLength(1);
      expect(vacanciesResAfterCreate.body[0]).toStrictEqual(createdVacancy);
    });
  });
});
