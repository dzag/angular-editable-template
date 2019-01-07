import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InputState } from '../../input-state';
import { AbstractInputComponent } from '../abstract-input.component';

@Component({
  selector: 'text-number-input',
  templateUrl: './text-and-number-input.component.html',
  styleUrls: ['./text-and-number-input.component.scss']
})
export class TextAndNumberInputComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  @ViewChild('input') _inputRef: ElementRef;

  constructor (_inputState: InputState,
               _renderer: Renderer2,
  ) {
    super(_renderer, _inputState);
  }

  ngOnInit () {
  }

  ngAfterViewInit (): void {
    const $content = this._inputRef.nativeElement;
    this.init($content);
  }

  protected triggerValueChanges(event) {
    const value = this._inputState.typeHandler.map(event.target.innerText);
    this._inputState.onChange(value);
  }

}
