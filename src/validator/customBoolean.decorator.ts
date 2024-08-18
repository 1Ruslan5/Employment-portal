import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsSpecificBooleanConstraint implements ValidatorConstraintInterface {
  private allowedValue: boolean;

  constructor(allowedValue: boolean) {
    this.allowedValue = allowedValue;
  }

  validate(value: any): boolean {
    return value === this.allowedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be ${this.allowedValue}`;
  }
}

export function IsSpecificBoolean(allowedValue: boolean, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [allowedValue],
      validator: new IsSpecificBooleanConstraint(allowedValue),
    });
  };
}
