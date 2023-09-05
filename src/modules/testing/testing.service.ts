import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestingService {
  private readonly logger: Logger = new Logger(TestingService.name);
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async wipeAll(): Promise<boolean> {
    try {
      await this.userModel.delete({});
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
