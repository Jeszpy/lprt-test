import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueEmailValidator } from '../../validators/is-unique-email.validator';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueEmailValidator,
    });
  };
}
