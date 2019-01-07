import { NumberType } from './types/number-type';
import { DefaultType } from './types/default-type';
import { TextAndNumberInputComponent } from './inputs/text-and-number-input/text-and-number-input.component';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { CurrencyInputComponent } from './inputs/currency-input/currency-input.component';

export const TYPE_REGISTRY = {
  text: {
    type: DefaultType,
    component: TextAndNumberInputComponent,
  },
  number: {
    type: NumberType,
    component: TextAndNumberInputComponent,
  },
  date: {
    type: DefaultType,
    component: DateInputComponent,
  },
  currency: {
    type: NumberType,
    component: CurrencyInputComponent,
  }
};
