/* tslint:disable:member-ordering */

import { BehaviorSubject } from 'rxjs';
import { ContentTypeHandler } from './types/content-type-handler';

export class InputState {

  // Control Value Accessor
  writeValue$ = new BehaviorSubject(null);
  isDisabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  typeHandler: ContentTypeHandler<any>;

  // Inputs
  type;
  placeholder;
  dateTemplate;

}
