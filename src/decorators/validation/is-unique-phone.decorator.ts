import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniquePhoneValidator } from '../../validators/is-unique-phone.validator';

export function IsUniquePhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUniquePhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniquePhoneValidator,
    });
  };
}
