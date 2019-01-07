
export interface ContentTypeHandler<T> {

  inline: boolean;

  overrideDefaultKeys: boolean;

  allowKeys(code): boolean;

  map (value: any): T | null | undefined;

}
