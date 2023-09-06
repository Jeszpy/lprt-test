import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsPublisherExistsValidator } from '../../validators/is-publisher-exists.validator';

export function IsPublisherExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPublisherExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPublisherExistsValidator,
    });
  };
}
