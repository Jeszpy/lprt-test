import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}
  @Delete('wipe-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async wipeAllData() {
    return this.testingService.wipeAll();
  }
}
