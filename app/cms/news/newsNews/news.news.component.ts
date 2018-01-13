
import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NewsNewsDeleteComponent} from '../dialogComponent/newsNewsDelete/news.news.delete.component';
import {NewsNewsSearchComponent} from '../dialogComponent/newsNewsSearch/news.news.search.component';
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
import { News } from '../../../model/news';
import { Message } from '../../../model/message';
import { FilterType, ServerError, ConditionType } from '../../../util/enums';
import { Item } from '../../../model/item';
import { FilterColl, Filter } from '../../../model/filter';
import * as moment from 'jalali-moment';


/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-news-news' ,
templateUrl: './news.news.component.html' ,
styleUrls: ['./news.news.component.css']
})
export class NewsNewsComponent implements OnInit  {
  public dataSource;
  public selectedItems = [];
  public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
  startDate: string;
  endDate: string;
  title: string;
  code: number;
  type: string;
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

openDialogDeleteComponent() {
  const dialogRef = this.dialog.open(NewsNewsDeleteComponent, {
  height: '350px',
  // data: { deletObj: this.selectedItems}
  });

  dialogRef.afterClosed().subscribe(result => {
  if ( result === true) {
    this.selectedItems.forEach(element => {
      const params: string[] = [];
      params.push(JSON.stringify(element));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'DeleteNews' , params ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'حذف خبر';
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
     });
    });
    this.getAllNews();
  }
  });
}

openSearchDialog() {
  const dialogRef = this.dialog.open(NewsNewsSearchComponent, {
  height: '500px',
  data: { startDate: this.startDate, endDate: this.endDate, title: this.title, code: this.code, type: this.type  }
  });

  dialogRef.afterClosed().subscribe(data => {
    debugger;
    console.log(data);
    if (data.startDate) {
      const input = data.startDate.year + '/' + data.startDate.month + '/' + data.startDate.day;
          const m = moment(input, 'jYYYY/jMM/jDD');
          if (m.isValid()) {
            data.startDate = m.format('YYYY/MM/D');
          }
        }
        if (data.endDate) {
          const input = data.endDate.year + '/' + data.endDate.month + '/' + data.endDate.day;
              const m = moment(input, 'jYYYY/jMM/jDD');
              if (m.isValid()) {
                data.endDate = m.format('YYYY/MM/D');
              }
            }
    const filter1 = new Filter();
    filter1.FilterType = FilterType[FilterType.Between];
    filter1.RefTable = 'Content' ;
    filter1.FieldName = 'FromDate' ;
    filter1.FilterValue = data.startDate + '-' + data.endDate;

    const filter2 = new Filter();
    filter2.FilterType = FilterType[FilterType.Contains];
    filter2.RefTable = 'Content' ;
    filter2.FieldName = 'ContentTitle' ;
    filter2.FilterValue = data.title;

    const filter3 = new Filter();
    filter3.FilterType = FilterType[FilterType.Contains];
    filter3.RefTable = 'Content' ;
    filter3.FieldName = 'ContentTitle' ;
    filter3.FilterValue = data.title;

    const filterColl = new FilterColl();
    filterColl.InnerCondition = ConditionType[ConditionType.AND];
    filterColl.OuterCondition = ConditionType[ConditionType.AND];
    
    if ( data.endDate && data.startDate && data.title) {
      filterColl.Filters = [filter1 , filter2];
    }else if (!data.title) {
      filterColl.Filters = [filter1];
    }else if (!data.endDate || !data.startDate) {
      filterColl.Filters = [filter2];
    }

    const params: string[] = [];
    params.push(JSON.stringify([filterColl]));
    params.push(JSON.stringify('CreatedOn ASC'));
    params.push(JSON.stringify('0'));
    params.push(JSON.stringify('100'));
    params.push(JSON.stringify('fa'));
    this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'GetNews' , params ,
     (error: ServerError , msg: Message) => {
       if (error === ServerError.None) {
        this.dataSource = JSON.parse(msg.Data);
       }
    });
  });
}
ngOnInit(): void {
    this.getAllNews();
  }
 private getAllNews() {
      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('CreatedOn ASC'));
      params.push(JSON.stringify('0'));
      params.push(JSON.stringify('100'));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'GetNews' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataSource = JSON.parse(msg.Data);
         }
      });
  }
}
