import { Component, OnInit } from '@angular/core';
import { InputState } from '../../input-state';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  constructor (private _inputState: InputState) {}

  ngOnInit () {
  }

  onInput ($event: Event) {

  }

  onBlur ($event: FocusEvent) {

  }
}
