import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
  selector: 'app-discontent-search-component',
  templateUrl: 'discontent.search.component.html',
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class DiscontentSearchComponent {
  constructor(
    public dialogRef: MatDialogRef<DiscontentSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}