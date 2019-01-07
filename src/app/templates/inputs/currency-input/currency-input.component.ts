import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractInputComponent } from '../abstract-input.component';
import { InputState } from '../../input-state';
import { placeCaretAtEnd } from '../../templates.util';

const toVndCurrency = (value: string) => {
  if (!value) {
    return '';
  }

  const numberString = value.toString().replace('.', ',');
  const parts = numberString.split(',');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};

const makeNumberFromVndCurrency = (value: string) => {
  const r1 = value.replace(/\./g, '');
  return r1.replace(',', '.');
};

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  @ViewChild('input') _inputRef: ElementRef;

  constructor (_inputState: InputState,
               _renderer: Renderer2
  ) {
    super(_renderer, _inputState);
  }

  ngOnInit () {}

  ngAfterViewInit (): void {
    this.init(this._inputRef.nativeElement);
  }

  onInput (event) {
    this._triggerValueChanges(event, true);
  }

  onBlur (event) {
    this._triggerValueChanges(event);
  }

  writeValue (inputElement, value) {
    this._renderer.setProperty(inputElement, 'innerText', toVndCurrency(value));
  }

  _triggerValueChanges (event, caretAtEnd = false) {
    const value = makeNumberFromVndCurrency(event.target.innerText);
    this._inputState.onChange(+value);
    this._renderer.setProperty(this._inputRef.nativeElement, 'innerText', toVndCurrency(value));
    if (caretAtEnd) {
      placeCaretAtEnd(event.target);
    }
  }

}
