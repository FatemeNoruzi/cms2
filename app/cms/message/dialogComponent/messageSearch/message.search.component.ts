import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-message-search-component',
    templateUrl: 'message.search.component.html',
    providers: [
      {provide: NgbCalendar, useClass: NgbCalendarPersian},
      {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
    ]
  })
  export class MessageSearchComponent {
    types = [
      {value: '0', viewValue: 'همه'},
      {value: '1', viewValue: 'پورسانت'},
      {value: '2', viewValue: 'ثبت سفارش'},
      {value: '3', viewValue: 'پیام شخصی'},
      {value: '4', viewValue: 'پیام عمومی'}
    ];
    constructor(
      public dialogRef: MatDialogRef<MessageSearchComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }