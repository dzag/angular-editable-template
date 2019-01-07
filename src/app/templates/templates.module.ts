import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateInputComponent } from './template-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ENTRY_INPUTS } from './inputs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TemplateInputComponent,
    ...ENTRY_INPUTS,
  ],
  exports: [
    TemplateInputComponent
  ],
  entryComponents: [
    ...ENTRY_INPUTS,
  ]
})
export class TemplatesModule { }
