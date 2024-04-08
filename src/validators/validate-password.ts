import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)\S{6,10}$/;

    return regex.test(text);
  }

  defaultMessage() {
    return 'The password format is invalid.';
  }
}

export function IsValidPassword() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: PasswordValidator,
    });
  };
}
