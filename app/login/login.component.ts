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
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  hide = true;
  rejister() {
    console.log('jkdgcjksdgcfj');
    this.router.navigate(['/cms/cms']);
  }
}