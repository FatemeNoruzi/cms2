import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
    selector: 'app-message-add-component',
    templateUrl: 'message.add.component.html',
    styleUrls: ['./message.add.component.css']
  })
export class MessageAddComponent {
  types = [
    {value: '0', viewValue: 'همه'},
    {value: '1', viewValue: 'پورسانت'},
    {value: '2', viewValue: 'ثبت سفارش'},
    {value: '3', viewValue: 'پیام شخصی'},
    {value: '4', viewValue: 'پیام عمومی'}
  ];
}