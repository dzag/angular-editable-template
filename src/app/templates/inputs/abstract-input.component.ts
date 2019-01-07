import { DEFAULT_ALLOWED_KEYS } from '../default-allowed-key';
import { Renderer2 } from '@angular/core';
import { InputState } from '../input-state';

export abstract class AbstractInputComponent {

  protected constructor (protected _renderer: Renderer2,
                         protected _inputState: InputState,
  ) {
  }

  init (inputElement) {
    this._inputState.writeValue$.subscribe(value => {
      this.writeValue(inputElement, value);
    });
    this.setAttributes(inputElement);
    this.onKeyDown(inputElement);
  }

  onInput (event) {
    this.triggerValueChanges(event);
  }

  onBlur (event) {
    this.triggerValueChanges(event);
  }

  writeValue (inputElement, value) {
    this.defaultWriteValue(inputElement, value);
  }

  setAttributes (inputElement) {
    this.defaultSetAttributes(inputElement);
  }

  onKeyDown(inputElement) {
    this.defaultSubscribeKeyDownEvent(inputElement);
  }

  protected triggerValueChanges (event) {
    this._inputState.onChange(event.target.innerText);
  }

  private defaultWriteValue (inputElement, value) {
    this._renderer.setProperty(inputElement, 'innerText', value);
  }

  private defaultSetAttributes (inputElement) {
    this._renderer.setAttribute(inputElement, 'placeholder', this._inputState.placeholder);
    this._renderer.setAttribute(inputElement, 'type', this._inputState.type);
    this._renderer.setAttribute(inputElement, 'inline', this._inputState.typeHandler.inline ? 'true' : 'false');
  }

  private defaultSubscribeKeyDownEvent(inputElement) {
    const allowKeys = this._inputState.typeHandler.allowKeys;
    const overrideDefaultKeys = this._inputState.typeHandler.overrideDefaultKeys;

    inputElement.addEventListener('keydown', event => {
      if (event.which === 13) {
        event.target.blur();
        event.preventDefault();
      }

      if (!overrideDefaultKeys && DEFAULT_ALLOWED_KEYS.includes(event.which)) {
        return;
      }

      if (typeof allowKeys === 'function' && !allowKeys(event.which)) {
        event.preventDefault();
        return;
      }
    });
  }
}
