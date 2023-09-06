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

describe('Users e2e tests', () => {
  jest.setTimeout(15 * 1000);

  let app: INestApplication;
  let server: any;
  let usersFactory: UsersTestingFactory;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = addSettingsToApp(app);
    server = app.getHttpServer();
    usersFactory = new UsersTestingFactory(server);
    await app.init();
  });

  describe('create user tests', () => {
    it('should wipe all data before test', async () => {
      const res = await request(server)
        .delete(endpoints.testing.wipeAllData)
        .send();

      expect(res.status).toBe(HttpStatus.NO_CONTENT);

      const usersRes = await usersFactory.getAllUsers();
      expect(usersRes.status).toBe(HttpStatus.OK);
      expect(usersRes.body).toHaveLength(0);
    });
    it('send empty body => should return 400 status code and validation errors', async () => {
      const emptyData = {} as CreateUserDto;
      const errors = badReqErrorsGenerator(['userName', 'email']);
      const res = await usersFactory.createUserRawReq(emptyData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('sending empty strings in object fields => should return 400 status code and validation errors', async () => {
      const emptyStringsData: CreateUserDto = {
        userName: '',
        email: '',
        phone: '',
      };
      const errors = badReqErrorsGenerator(['userName', 'email', 'phone']);
      const res = await usersFactory.createUserRawReq(emptyStringsData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('iterate over string lengths => should return 400 status code and validation errors', async () => {
      const invalidData: CreateUserDto = {
        userName: faker.lorem.paragraphs(10),
        email: faker.lorem.paragraphs(10),
        phone: faker.lorem.paragraphs(10),
      };
      const errors = badReqErrorsGenerator(['userName', 'email', 'phone']);
      const res = await usersFactory.createUserRawReq(invalidData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });

    it('input of correct data => should return 201 status code and created user', async () => {
      const usersResBeforeCreate = await usersFactory.getAllUsers();
      expect(usersResBeforeCreate.status).toBe(HttpStatus.OK);
      expect(usersResBeforeCreate.body).toHaveLength(0);

      const correctData: CreateUserDto = usersFactory.getValidInputData();

      const res = await usersFactory.createUserRawReq(correctData);

      expect(res.status).toBe(HttpStatus.CREATED);
      const createdUser = res.body;
      expect(createdUser).toEqual({
        id: expect.any(String),
        userName: correctData.userName,
        email: correctData.email,
        phone: correctData.phone,
        createdAt: expect.any(String),
      });

      const usersResAfterCreate = await usersFactory.getAllUsers();
      expect(usersResAfterCreate.status).toBe(HttpStatus.OK);
      expect(usersResAfterCreate.body).toHaveLength(1);
      expect(usersResAfterCreate.body[0]).toEqual(createdUser);

      expect.setState({ user: createdUser });
    });

    it('not unique data => should return 400 status code and validation errors', async () => {
      const { user } = expect.getState();
      const notUniqueData: CreateUserDto = {
        userName: user.userName,
        email: user.email,
        phone: user.phone,
      };
      const errors = badReqErrorsGenerator(['userName', 'email', 'phone']);
      const res = await usersFactory.createUserRawReq(notUniqueData);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toStrictEqual(errors);
    });
  });

  describe('create user tests', () => {
    const countOfUsers = 100;
    it('should wipe all data before test', async () => {
      const res = await request(server)
        .delete(endpoints.testing.wipeAllData)
        .send();

      expect(res.status).toBe(HttpStatus.NO_CONTENT);

      const usersRes = await usersFactory.getAllUsers();

      expect(usersRes.status).toBe(HttpStatus.OK);
      expect(usersRes.body).toHaveLength(0);
    });
    it('prepare data for test', async () => {
      const createdUsers = await usersFactory.createUsers(countOfUsers);

      expect(createdUsers).toHaveLength(countOfUsers);
      expect.setState({ users: createdUsers });
    });

    it('get all users => should return 200 status code and all created users', async () => {
      const { users } = expect.getState();
      const getAllUsersRes = await usersFactory.getAllUsers();

      expect(getAllUsersRes.status).toBe(HttpStatus.OK);
      expect(getAllUsersRes.body).toHaveLength(countOfUsers);
      expect(getAllUsersRes.body).toStrictEqual(expect.arrayContaining(users));
    });
  });
});
