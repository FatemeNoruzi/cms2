import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-education-meeting-add-component',
    templateUrl: 'education.meeting.add.component.html',
    styleUrls: ['./education.meeting.add.component.css']
  })
  export class EducationMeetingAddComponent {
  }