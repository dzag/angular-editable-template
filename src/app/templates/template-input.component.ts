import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TYPE_REGISTRY } from './type-registry';
import { InputState } from './input-state';

export const INITIATED_TYPES = Object.entries(TYPE_REGISTRY).reduce((prev, [key, value]) => {
  prev[key] = new value.type();
  return prev;
}, {});

@Component({
  selector: 'template-input',
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemplateInputComponent),
      multi: true,
    },
    InputState,
  ],
})
export class TemplateInputComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {

  @ViewChild('input', { read: ViewContainerRef }) _viewContainer: ViewContainerRef;

  @Input() type = 'text';
  @Input() placeholder = '...';

  @Input() dateTemplate = 'Hà Nội, ngày {day} tháng {month} năm {year}';

  constructor (private _renderer: Renderer2,
               private _inputState: InputState,
               private _resolver: ComponentFactoryResolver,
               private _cd: ChangeDetectorRef,
  ) { }

  ngOnChanges (changes: SimpleChanges): void {
    this._setIfAvailable(changes, 'type');
    this._setIfAvailable(changes, 'placeholder');
    this._setIfAvailable(changes, 'dateTemplate');
  }

  ngOnInit () {
    this._inputState.type = this.type;
    this._inputState.placeholder = this.placeholder;
    this._inputState.dateTemplate = this.dateTemplate;

    this._inputState.typeHandler = INITIATED_TYPES[this.type];
  }

  ngAfterViewInit (): void {
    const type = TYPE_REGISTRY[this.type] || TYPE_REGISTRY['text'];
    const factory = this._resolver.resolveComponentFactory(type.component);
    this._viewContainer.createComponent(factory);
    this._cd.detectChanges();
  }

  ngOnDestroy (): void {
  }

  writeValue (value: any): void {
    this._inputState.writeValue$.next(value);
  }

  registerOnChange (fn: any): void { this._inputState.onChange = fn; }

  registerOnTouched (fn: any): void { this._inputState.onTouched = fn; }

  setDisabledState (isDisabled: boolean): void {
    this._inputState.isDisabled = isDisabled;
  }

  private _setIfAvailable (changes: SimpleChanges, prop) {
    if (changes[prop]) {
      this._inputState[prop] = changes[prop].currentValue;
    }
  }

}
