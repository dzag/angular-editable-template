import { AbstractContentTypeHandler } from './abstract-content-type-handler';

export class DefaultType extends AbstractContentTypeHandler<string> {

  overrideDefaultKeys = true;

  allowKeys (code) {
    return true;
  }

}
