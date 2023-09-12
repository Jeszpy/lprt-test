import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { isIntegerValidator } from '../../validators/is-integer.validator';
export const IsInteger = (
  defaultValue: number,
  min: number,
  max: number | null = null,
) => {
  return applyDecorators(
    Transform(({ value }) => isIntegerValidator(value, defaultValue, min, max)),
    IsOptional(),
  );
};
