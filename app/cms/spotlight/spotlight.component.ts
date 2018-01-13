
import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions , Headers } from '@angular/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SpotlightDeleteComponent} from './dialogComponent/spotlightDelete/spotlight.delete.component';
import {NewsNewsSearchComponent} from './dialogComponent/newsNewsSearch/news.news.search.component';
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
import { HttpService1 } from '../../util/decomService.component.1';
import { Document } from '../../model/document';
import { Message } from '../../model/message';
import { FilterType, ServerError, ConditionType } from '../../util/enums';
import { Item } from '../../model/item';
import { Spotlight } from '../../model/spotlight';
import { FilterColl, Filter } from '../../model/filter';
import * as moment from 'jalali-moment';
import {Input, OnChanges, SimpleChanges } from '@angular/core';


/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-spotlight' ,
templateUrl: './spotlight.component.html' ,
styleUrls: ['./spotlight.component.css']
})
export class SpotlightComponent implements OnInit  {
  @Input() message: string;
  public dataSource;
  public selectedItems = [];
  public imageUrl = 'http://192.168.1.25:8750/Service/getFile/';
  private options: RequestOptions;
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
      this.getAllSpotlight();
    }

    onPrev(): void {
      this.page--;
      this.getAllSpotlight();
    }


constructor( public httpServices: HttpService, public httpServices1: HttpService1, public dialog: MdDialog, public snackBar: MdSnackBar,
   private http: Http) { }
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
  if (this.dataSource) {
    return this.dataSource.every(_ => _.state);
  }
}


openDialogDeleteComponent(data) {
  const dialogRef = this.dialog.open(SpotlightDeleteComponent, {
  height: '350px',
  });

  dialogRef.afterClosed().subscribe(result => {
  if ( result === true) {
    const spotlight = new  Spotlight();
    const obj: string[] = [];
    spotlight.RowNum = data.RowNum;
    spotlight.StateMode = data.StateMode;
    spotlight.CreatedBy = data.CreatedBy;
    spotlight.IndexShow = data.IndexShow;
    spotlight.Desription = data.Desription;
    spotlight.IsShow = data.IsShow;
    spotlight.ModifiedOn = data.ModifiedOn;
    spotlight.Title = data.Title;
    spotlight.ModifiedBy = data.ModifiedBy;
    spotlight.CreatedOn = data.CreatedOn;
    spotlight.DataAreaID = data.DataAreaID;
    spotlight.SPOTLIGHTID = data.SPOTLIGHTID;
    spotlight.DocumentID = data.DocumentID;
    spotlight.DocumentName = data.DocumentName;
    spotlight.DocumentExtension = data.DocumentExtension;
    spotlight.Type = data.Type;
    spotlight.RefID = data.RefID;
    spotlight.WebContent = data.WebContent;
    spotlight.Link = data.Link;

  obj.push(JSON.stringify(spotlight));
  obj.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SPOTLIGHTControlLogic' , 'DeleteSpotlight' , obj ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'حذف خبر';
          this.getAllSpotlight();
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
     });
  }
  });
}

ngOnInit(): void {
    this.getAllSpotlight();
  }

 private getAllSpotlight() {
  const startIndex = (this.limit * (this.page - 1) ) ;

      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('CreatedOn ASC'));
      params.push(JSON.stringify(startIndex));
      params.push(JSON.stringify('10'));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SPOTLIGHTControlLogic' , 'GetSpotlight' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataSource = JSON.parse(msg.Data);
          console.log(this.dataSource);
          this.total = this.dataSource[0].TotalRow;
          this.loading = false;
         }
      });
  }
}
