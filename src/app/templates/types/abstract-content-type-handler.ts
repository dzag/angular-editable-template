import { ContentTypeHandler } from './content-type-handler';

export abstract class AbstractContentTypeHandler<T> implements ContentTypeHandler<T> {
  inline = true;

  overrideDefaultKeys = false;

  allowKeys (code): boolean {
    return true;
  }

  map (value: any): T | null | undefined {
    return value;
  }

}
