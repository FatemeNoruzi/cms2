
import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions , Headers } from '@angular/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileDeleteComponent} from './dialogComponent/fileDelete/file.delete.component';
import {NewsNewsSearchComponent} from './dialogComponent/newsNewsSearch/news.news.search.component';
import {UpdateFileComponent} from './dialogComponent/updateFile/update.file.component';
import {UploadFileComponent} from './dialogComponent/uploadFile/upload.file.component';
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
import { FilterColl, Filter } from '../../model/filter';
import * as moment from 'jalali-moment';
import {Input, OnChanges, SimpleChanges } from '@angular/core';


/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-file-manager' ,
templateUrl: './file.manager.component.html' ,
styleUrls: ['./file.manager.component.css']
})
export class FileManagerComponent implements OnInit  {
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
      this.getAllDocuments();
    }

    onPrev(): void {
      this.page--;
      this.getAllDocuments();
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
  // console.log('fired');
  if (this.dataSource) {
    return this.dataSource.every(_ => _.state);
  }
}

openDialogUpdateFileComponent($event) {
  const dialogRef = this.dialog.open(UpdateFileComponent, {
  height: '350px',
  data: { updateObj: $event}
  });

  dialogRef.afterClosed().subscribe(result => {
  if ( result ) {
    const formData = new FormData();
    formData.append('image', result.file);
    console.log(result);
    debugger;

    this.options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/octet-stream'})});
    if(result.file){
      this.http.post('http://192.168.1.25:8750/Service/upFile/4/' + result.file.name +
      '/' + result.updateObj.DOCUMENTID + '/' + result.updateObj.RefID + '/' + result.updateObj.DocumentTypeID
      + '/' + result.updateObj.EntityName + '/07ed7990-85e9-49ee-8371-b5db30d49e0f/fa' , result.file
      , this.options ).subscribe(data => {
        // Read the result field from the JSON response.
        const res = data['results'];
        this.getAllDocuments();
      });
    }else{
      this.http.post('http://192.168.1.25:8750/Service/upFile/4/' + result.updateObj.DocumentName + '.' +
       result.updateObj.DocumentExtension +
      '/' + result.updateObj.DOCUMENTID + '/' + result.updateObj.RefID + '/' + result.updateObj.DocumentTypeID
      + '/' + result.updateObj.EntityName + '/07ed7990-85e9-49ee-8371-b5db30d49e0f/fa' , result.file
      , this.options ).subscribe(data => {
        // Read the result field from the JSON response.
        const res = data['results'];
        this.getAllDocuments();
      });

    }
  }
  });
}

openDialogUploadFileComponent($event) {
  const dialogRef = this.dialog.open(UploadFileComponent, {
  height: '350px',
  data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    debugger;
  if ( result ) {
    const formData = new FormData();
    formData.append('image', result.file);
    console.log(result);
    debugger;
    this.options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/octet-stream'})});
    if(result.selectedType){
      this.http.post('http://192.168.1.25:8750/Service/upFile/4/' + result.name +
      '/' + null + '/' + null + '/' + result.selectedType.DocumentTypeID + '/' + result.entityName
      + '/07ed7990-85e9-49ee-8371-b5db30d49e0f/fa' , result.file
      , this.options ).subscribe(data => {
        // Read the result field from the JSON response.
        const res = data['results'];
        this.getAllDocuments();
      });


      
    }else {
      this.http.post('http://192.168.1.25:8750/Service/upFile/4/' + result.name +
      '/' + null + '/' + null + '/' + null + '/' + result.entityName
      + '/07ed7990-85e9-49ee-8371-b5db30d49e0f/fa' , result.file
      , this.options ).subscribe(data => {
        // Read the result field from the JSON response.
        const res = data['results'];
        this.getAllDocuments();
      });
    }
    
  }
  });
}

openDialogDeleteComponent() {
  const dialogRef = this.dialog.open(FileDeleteComponent, {
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
    this.getAllDocuments();
  }
  });
}

// openSearchDialog() {
//   const dialogRef = this.dialog.open(NewsNewsSearchComponent, {
//   height: '500px',
//   data: { startDate: this.startDate, endDate: this.endDate, title: this.title, code: this.code, type: this.type  }
//   });

//   dialogRef.afterClosed().subscribe(data => {
//     debugger;
//     console.log(data);
//     if (data.startDate) {
//       const input = data.startDate.year + '/' + data.startDate.month + '/' + data.startDate.day;
//           const m = moment(input, 'jYYYY/jMM/jDD');
//           if (m.isValid()) {
//             data.startDate = m.format('YYYY/MM/D');
//           }
//         }
//         if (data.endDate) {
//           const input = data.endDate.year + '/' + data.endDate.month + '/' + data.endDate.day;
//               const m = moment(input, 'jYYYY/jMM/jDD');
//               if (m.isValid()) {
//                 data.endDate = m.format('YYYY/MM/D');
//               }
//             }
//     const filter1 = new Filter();
//     filter1.FilterType = FilterType[FilterType.Between];
//     filter1.RefTable = 'Content' ;
//     filter1.FieldName = 'FromDate' ;
//     filter1.FilterValue = data.startDate + '-' + data.endDate;

//     const filter2 = new Filter();
//     filter2.FilterType = FilterType[FilterType.Contains];
//     filter2.RefTable = 'Content' ;
//     filter2.FieldName = 'ContentTitle' ;
//     filter2.FilterValue = data.title;

//     const filter3 = new Filter();
//     filter3.FilterType = FilterType[FilterType.Contains];
//     filter3.RefTable = 'Content' ;
//     filter3.FieldName = 'ContentTitle' ;
//     filter3.FilterValue = data.title;

//     const filterColl = new FilterColl();
//     filterColl.InnerCondition = ConditionType[ConditionType.AND];
//     filterColl.OuterCondition = ConditionType[ConditionType.AND];
    
//     if ( data.endDate && data.startDate && data.title) {
//       filterColl.Filters = [filter1 , filter2];
//     }else if (!data.title) {
//       filterColl.Filters = [filter1];
//     }else if (!data.endDate || !data.startDate) {
//       filterColl.Filters = [filter2];
//     }

//     const params: string[] = [];
//     params.push(JSON.stringify([filterColl]));
//     params.push(JSON.stringify('CreatedOn ASC'));
//     params.push(JSON.stringify('0'));
//     params.push(JSON.stringify('100'));
//     params.push(JSON.stringify('fa'));
//     this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'GetNews' , params ,
//      (error: ServerError , msg: Message) => {
//        if (error === ServerError.None) {
//         this.dataSource = JSON.parse(msg.Data);
//        }
//     });
//   });
// }
ngOnInit(): void {
    this.getAllDocuments();
  }

 private getAllDocuments() {
  const startIndex = (this.limit * (this.page - 1) ) + 1 ;

      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('CreatedOn ASC'));
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
          console.log(this.dataSource);
          this.total = this.dataSource[0].TotalRow;
          this.loading = false;
         }
      });
  }
}
