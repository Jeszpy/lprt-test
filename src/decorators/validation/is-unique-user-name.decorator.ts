import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueUserNameValidator } from '../../validators/is-unique-user-name.validator';

export function IsUniqueUserName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueUserName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueUserNameValidator,
    });
  };
}
