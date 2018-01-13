import {Component, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {DialogComponent} from '../dialog/dialog.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';

/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-news' ,
templateUrl: './news.component.html' ,
styleUrls: ['./news.component.css']
})
export class NewsComponent {
}

