import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

const prepareErrorResult = (errors: ValidationError[]) => {
  const result = [];
  errors.forEach((e) => {
    result.push({
      message: Object.values(e.constraints)[0],
      field: e.property,
    });
  });
  return result;
};

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  stopAtFirstError: true,
  exceptionFactory: (errors: ValidationError[]) => {
    throw new BadRequestException(prepareErrorResult(errors));
  },
});
