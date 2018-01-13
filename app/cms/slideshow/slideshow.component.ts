
import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SlideshowDeleteComponent} from './dialogComponent/slideshow.delete/slideshow.delete.component';;
import {PagingComponent} from '../paging/paging.component';
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
import { HttpService } from '../../util/decomService.component';
import { Document } from '../../model/document';
import { Message } from '../../model/message';
import { FilterType, ServerError, ConditionType } from '../../util/enums';
import { Item } from '../../model/item';
import { FilterColl, Filter } from '../../model/filter';
import * as moment from 'jalali-moment';
import { Slideshow } from './../../model/slideshow';
import {Input, OnChanges, SimpleChanges } from '@angular/core';


/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-slideshow' ,
templateUrl: './slideshow.component.html' ,
styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit  {
  @Input() message: string;
  public dataSource;
  public selectedItems = [];
  // public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
  // startDate: string;
  // endDate: string;
  // title: string;
  // code: number;
  // type: string;

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
      this.getAllSlideshow();
    }

    onPrev(): void {
      this.page--;
      this.getAllSlideshow();
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




private deleteSlideshow(data) {

      const slideshow = new  Slideshow();
      slideshow.RowNum = data.RowNum;
      slideshow.StateMode = data.StateMode;
      slideshow.DataAreaID = data.DataAreaID;
      slideshow.SliderTitle = data.SliderTitle;
      slideshow.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      slideshow.SpeedRate = data.SpeedRate;
      slideshow.MinWidth = data.MinWidth;
      slideshow.Ratio = data.Ratio;
      slideshow.SlideName = data.SlideName;
      slideshow.NumberSlides = data.NumberSlides;
      slideshow.Status = data.Status;
      slideshow.Duration = data.Duration;
      slideshow.CreatedBy = data.CreatedBy;
      slideshow.SLIDERHEADERID = data.SLIDERHEADERID;
      slideshow.Attribute = data.Attribute;
      slideshow.MaxWidth = data.MaxWidth;
      slideshow.CreatedOn = data.CreatedOn;
      slideshow.ModifiedOn = data.ModifiedOn;
      slideshow.Entity = data.Entity;
      slideshow.EntityName = data.EntityName;
      const obj: string[] = [];
      obj.push(JSON.stringify(slideshow));
      obj.push(JSON.stringify('fa'));
      debugger;
      this.httpServices.requset('DecomMISBLL' , 'SLIDERHEADERControlLogic' , 'DeleteSlider' , obj ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'حذف اسلایدر';
          this.getAllSlideshow();
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
     });
    }

ngOnInit(): void {
    this.getAllSlideshow();
  }

 private getAllSlideshow() {
  const startIndex = (this.limit * (this.page - 1) );

      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('CreatedOn ASC'));
      params.push(JSON.stringify(startIndex));
      params.push(JSON.stringify('10'));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SLIDERHEADERControlLogic' , 'GetSlider' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataSource = JSON.parse(msg.Data);
          this.total = this.dataSource[0].TotalRow;
          this.loading = false;
         }
      });
  }
}
