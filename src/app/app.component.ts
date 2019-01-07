import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'templates';
  formGroup: FormGroup;

  constructor (private fb: FormBuilder) {
  }

  ngOnInit (): void {
    this.formGroup = this.fb.group({
      name: '123123\n',
      total: 100,
      date: new Date(),
      money1: 1000,
      money2: 1000,
      moneyTotal: 2000,
    });

    combineLatest(
      this.formGroup.get('money1').valueChanges.pipe(startWith(this.formGroup.get('money1').value)),
      this.formGroup.get('money2').valueChanges.pipe(startWith(this.formGroup.get('money2').value)),
    ).subscribe(([m1, m2]) => {
      this.formGroup.get('moneyTotal').setValue(m1  + m2);
    });

  }

}
