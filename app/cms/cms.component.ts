import { Component, HostListener, OnInit , ViewChild, ElementRef} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import { HttpService } from '../util/decomService.component';
import { Message } from '../model/message';
import { FilterType, ServerError } from '../util/enums';
import { Item } from '../model/item';
import { FilterColl, Filter } from '../model/filter';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CMSComponent {
}