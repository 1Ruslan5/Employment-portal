import { registerDecorator, ValidationOptions } from 'class-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserRoles } from '../user/types/userRoles.type';

@ValidatorConstraint({ async: false })
export class IsUserRoleConstraint implements ValidatorConstraintInterface {
  validate(role: any, args: ValidationArguments) {
    const validRoles: UserRoles[] = ['SUBMITTER', 'CUSTOMER'];
    return validRoles.includes(role);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Role must be one of the following values: SUBMITTER, CUSTOMER';
  }
}

export function IsUserRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserRoleConstraint,
    });
  };
}
