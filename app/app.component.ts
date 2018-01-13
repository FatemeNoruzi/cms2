import { Component, HostListener, OnInit , ViewChild, ElementRef} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import { HttpService } from './util/decomService.component';
import { HttpService1 } from './util/decomService.component.1';
import { Message } from './model/message';
import { FilterType, ServerError } from './util/enums';
import { Item } from './model/item';
import { FilterColl, Filter } from './model/filter';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
}
}