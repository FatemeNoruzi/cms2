
import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {NgModule} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HttpModule} from '@angular/http';
import { HttpService } from '../../../util/decomService.component';
import { Document } from '../../../model/document';
import { Message } from '../../../model/message';
import { FilterType, ServerError, ConditionType } from '../../../util/enums';
import { Item } from '../../../model/item';
import { FilterColl, Filter } from '../../../model/filter';
import * as moment from 'jalali-moment';
import {Input, OnChanges, SimpleChanges } from '@angular/core';


/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-slideshow-detail' ,
templateUrl: './slideshow.detail.component.html' ,
styleUrls: ['./slideshow.detail.component.css']
})
export class SlideshowDetailComponent implements OnInit  {
  @Input() message: string;
  public dataSource;
  public selectedItems = [];
  public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
  startDate: string;
  endDate: string;
  title: string;
  code: number;
  type: string;

// paging defoult input
    loading = false;
    total = 0;
    page = 1;
    limit = 10;
// paging emmit
    // goToPage(n: number): void {
    //   this.page = n;
    //   this.getAllDocuments();
    // }

    onNext(): void {
      this.page++;
      this.getAllSlider();
    }

    onPrev(): void {
      this.page--;
      this.getAllSlider();
    }


constructor( public httpServices: HttpService, public dialog: MdDialog, public snackBar: MdSnackBar) { }
checkAll(ev) {
  if (this.dataSource) {
    this.dataSource.forEach(x => x.state = ev.target.checked);
  }
 }

 checkItem(ev) {
  const index: number = this.selectedItems.indexOf(ev);
  if (index !== -1) {
      this.selectedItems.splice(index, 1);
  }else {
    this.selectedItems.push(ev);
  }
 }

isAllChecked() {
  // console.log('fired');
  if (this.dataSource) {
    return this.dataSource.every(_ => _.state);
  }
}

ngOnInit(): void {
    this.getAllSlider();
  }

 private getAllSlider() {
  const startIndex = (this.limit * (this.page - 1) ) + 1 ;

      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('DocumentName ASC'));
      params.push(JSON.stringify(startIndex));
      params.push(JSON.stringify('10'));
      params.push(JSON.stringify(null));
      params.push(JSON.stringify(null));
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'DOCUMENTControlLogic' , 'GetDocument' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataSource = JSON.parse(msg.Data);
          this.total = this.dataSource[0].TotalRow;
          this.loading = false;
         }
      });
  }
}
