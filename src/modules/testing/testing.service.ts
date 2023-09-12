import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Injectable()
export class TestingService {
  private readonly logger: Logger = new Logger(TestingService.name);
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
    @InjectRepository(Vacancy)
    private readonly vacancyModel: Repository<Vacancy>,
  ) {}
  async wipeAll(): Promise<boolean> {
    try {
      await this.vacancyModel.delete({});
      await this.userModel.delete({});
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
