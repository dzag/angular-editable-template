import { AbstractContentTypeHandler } from './abstract-content-type-handler';

export class NumberType extends AbstractContentTypeHandler<number> {
  allowKeys (code) {
    if (code >= 48 && code <= 57 || code >= 96 && code <= 105) {
      return true;
    }

    return false;
  }

  map (value: any): number {
    if (isNumeric(value)) {
      return +value;
    }

    console.warn('The value is not a valid number', value);
    return value;
  }

}

function isNumeric (value: any) {
  return !isNaN(value);
}
