import {Component, ElementRef, ViewChild, Inject, OnInit,   AfterViewInit} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessageDeleteComponent} from './dialogComponent/messageDelete/message.delete.component';
// import {NewsNewsSearchComponent} from '../dialogComponent/newsNewsSearch/news.news.search.component';
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
import { News } from '../../model/news';
import { Message } from '../../model/message';
import { MessagePrivate } from './../../model/message.private';
import { FilterType, ServerError, ConditionType } from '../../util/enums';
import { Item } from '../../model/item';
import { FilterColl, Filter } from '../../model/filter';
import * as moment from 'jalali-moment';
/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-message' ,
templateUrl: './message.component.html' ,
styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit  {
    public dataSource;
    public selectedItems = [];
    public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
    startDate: string;
    endDate: string;
    title: string;
    code: number;
    type: string;
    loading = false;
    total = 0;
    page = 1;
    limit = 10;
  constructor( public httpServices: HttpService, public dialog: MdDialog, public snackBar: MdSnackBar) { }


  onNext(): void {
    this.page++;
    this.getAllMessage();
  }

  onPrev(): void {
    this.page--;
    this.getAllMessage();
  }

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

 private ChangeStatusMessage(MESSAGE , item, status) {
  const messagePrivate = new MessagePrivate();
  const obj: string[] = [];
  messagePrivate.RowNum = MESSAGE.RowNum;
  messagePrivate.StateMode = MESSAGE.StateMode;

  messagePrivate.Status = MESSAGE.Status;

  messagePrivate.MESSAGEID = MESSAGE.MESSAGEID;

  messagePrivate.NationalCode = MESSAGE.NationalCode;

  messagePrivate.CreatedBy = MESSAGE.CreatedBy;

  messagePrivate.CreatedOn = MESSAGE.CreatedOn;

  messagePrivate.DataAreaID = MESSAGE.DataAreaID;

  messagePrivate.ModifiedOn = MESSAGE.ModifiedOn;

  messagePrivate.Email = MESSAGE.Email;

  messagePrivate.ModifiedBy = MESSAGE.ModifiedBy;

  messagePrivate.LanguageCode = 'fa';

  messagePrivate.Tell = MESSAGE.Tell;

  messagePrivate.MessageTypeID = MESSAGE.MessageTypeID;

  messagePrivate.MessageParentID = MESSAGE.MessageParentID;

  messagePrivate.Attribute = MESSAGE.Attribute ;

  messagePrivate.Mobile = MESSAGE.Mobile;

  messagePrivate.MessageText = MESSAGE.MessageText;

  messagePrivate.SenderUserID = MESSAGE.SenderUserID;

  messagePrivate.SendDate = MESSAGE.SendDate;

  messagePrivate.MessageTitle = MESSAGE.MessageTitle;

  messagePrivate.FullName = MESSAGE.FullName;

  messagePrivate.TrackingCode = MESSAGE.TrackingCode;

  messagePrivate.Description = MESSAGE.Description;

  messagePrivate.IndexMessage = MESSAGE.IndexMessage;

  messagePrivate.MessageCode = MESSAGE.MessageCode;

  messagePrivate.TypeIndex = MESSAGE.TypeIndex;

  messagePrivate.ReceiverUserID = '01bf640e-096b-4a81-8942-392456783ff9';

  messagePrivate.DocumentName = MESSAGE.DocumentName;

  messagePrivate.DocumentExtension = MESSAGE.DocumentExtension;

  messagePrivate.ReceiverName = MESSAGE.ReceiverName;

  messagePrivate.SenderName = MESSAGE.SenderName;

  messagePrivate.CountNotRead = MESSAGE.CountNotRead;
  if (item === 'IsShow') {
    messagePrivate.IsShow = status;
  }else {
    messagePrivate.IsShow = MESSAGE.IsShow;
  }
   if (item === 'IsRead') {
    messagePrivate.IsRead = status;
  }else {
    messagePrivate.IsRead = MESSAGE.IsRead;
  }
  if (item === 'IsClose') {
    messagePrivate.IsClose = status;
  }else {
    messagePrivate.IsClose = MESSAGE.IsClose;
  }
    obj.push(JSON.stringify(messagePrivate));
    obj.push(JSON.stringify('0'));
    obj.push(JSON.stringify('update'));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertUpdateMessageAdmin' , obj ,
    (error: ServerError , msg: Message) => {
      if (error === ServerError.None) {
        this.getAllMessage();
        const message = 'انجام شد';
        const action = 'ویرایش پیام';
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  });

 }

 private ReadMessage(ID , status) {
  const messagePrivate = new MessagePrivate();
  const obj: string[] = [];
  messagePrivate.RowNum = '';
  messagePrivate.StateMode = '';

  messagePrivate.Status = '';

  messagePrivate.MESSAGEID = ID;

  messagePrivate.NationalCode = '';

  messagePrivate.CreatedBy = '';

  messagePrivate.CreatedOn = '';

  messagePrivate.DataAreaID = '';

  messagePrivate.ModifiedOn = '';

  messagePrivate.Email = '';

  messagePrivate.ModifiedBy = '';

  messagePrivate.LanguageCode = 'fa';

  messagePrivate.Tell = '';

  messagePrivate.MessageTypeID = '';

  messagePrivate.MessageParentID = '';

  messagePrivate.Attribute = '';

  messagePrivate.Mobile = '';

  messagePrivate.MessageText = '';

  messagePrivate.SenderUserID = '';

  messagePrivate.SendDate = '';

  messagePrivate.MessageTitle = '';

  messagePrivate.FullName = '';

  messagePrivate.TrackingCode = '';

  messagePrivate.Description = '';

  messagePrivate.IndexMessage = '';

  messagePrivate.MessageCode = '';

  messagePrivate.IsShow = '';

  messagePrivate.IsRead = status;

  messagePrivate.TypeIndex = '';

  messagePrivate.IsClose = '';

  messagePrivate.ReceiverUserID = '';

  messagePrivate.DocumentName = '';

  messagePrivate.DocumentExtension = '';

  messagePrivate.ReceiverName = '';

  messagePrivate.SenderName = '';

  messagePrivate.CountNotRead = '';
    obj.push(JSON.stringify(messagePrivate));
    obj.push(JSON.stringify('0'));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertMessage' , obj ,
    (error: ServerError , msg: Message) => {
      if (error === ServerError.None) {
        this.getAllMessage();
        const message = 'انجام شد';
        const action = 'ویرایش پیام';
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  });

 }

 private CloseMessage(ID , status) {
  const messagePrivate = new MessagePrivate();
  const obj: string[] = [];
  messagePrivate.RowNum = '';
  messagePrivate.StateMode = '';

  messagePrivate.Status = '';

  messagePrivate.MESSAGEID = ID;

  messagePrivate.NationalCode = '';

  messagePrivate.CreatedBy = '';

  messagePrivate.CreatedOn = '';

  messagePrivate.DataAreaID = '';

  messagePrivate.ModifiedOn = '';

  messagePrivate.Email = '';

  messagePrivate.ModifiedBy = '';

  messagePrivate.LanguageCode = 'fa';

  messagePrivate.Tell = '';

  messagePrivate.MessageTypeID = '';

  messagePrivate.MessageParentID = '';

  messagePrivate.Attribute = '';

  messagePrivate.Mobile = '';

  messagePrivate.MessageText = '';

  messagePrivate.SenderUserID = '';

  messagePrivate.SendDate = '';

  messagePrivate.MessageTitle = '';

  messagePrivate.FullName = '';

  messagePrivate.TrackingCode = '';

  messagePrivate.Description = '';

  messagePrivate.IndexMessage = '';

  messagePrivate.MessageCode = '';

  messagePrivate.IsShow = '';

  messagePrivate.IsRead = '';

  messagePrivate.TypeIndex = '';

  messagePrivate.IsClose = status;

  messagePrivate.ReceiverUserID = '';

  messagePrivate.DocumentName = '';

  messagePrivate.DocumentExtension = '';

  messagePrivate.ReceiverName = '';

  messagePrivate.SenderName = '';

  messagePrivate.CountNotRead = '';
    obj.push(JSON.stringify(messagePrivate));
    obj.push(JSON.stringify('0'));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertMessage' , obj ,
    (error: ServerError , msg: Message) => {
      if (error === ServerError.None) {
        this.getAllMessage();
        const message = 'انجام شد';
        const action = 'ویرایش پیام';
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  });

 }

  isAllChecked() {
    // console.log('fired');
    if (this.dataSource) {
      return this.dataSource.every(_ => _.state);
    }
  }

  openDialogDeleteComponent() {
    const dialogRef = this.dialog.open(MessageDeleteComponent, {
    height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    if ( result === true) {
      this.selectedItems.forEach(element => {
        const messagePrivate = new MessagePrivate();
        const params: string[] = [];

        messagePrivate.RowNum = '';
        messagePrivate.StateMode = '';
        messagePrivate.Status = '';
        messagePrivate.MESSAGEID = element;
        messagePrivate.NationalCode = '';
        messagePrivate.CreatedBy = '';
        messagePrivate.CreatedOn = '';
        messagePrivate.DataAreaID = '';
        messagePrivate.ModifiedOn = '';
        messagePrivate.Email = '';
        messagePrivate.ModifiedBy = '';
        messagePrivate.LanguageCode = 'fa';
        messagePrivate.Tell = '';
        messagePrivate.MessageTypeID = '';
        messagePrivate.MessageParentID = '';
        messagePrivate.Attribute = '';
        messagePrivate.Mobile = '';
        messagePrivate.MessageText = '';
        messagePrivate.SenderUserID = '';
        messagePrivate.SendDate = '';
        messagePrivate.MessageTitle = '';
        messagePrivate.FullName = '';
        messagePrivate.TrackingCode = '';
        messagePrivate.Description = '';
        messagePrivate.IndexMessage = '';
        messagePrivate.MessageCode = '';
        messagePrivate.IsShow = '';
        messagePrivate.IsRead = '';
        messagePrivate.TypeIndex = '';
        messagePrivate.IsClose = '';
        messagePrivate.ReceiverUserID = '';
        messagePrivate.DocumentName = '';
        messagePrivate.DocumentExtension = '';
        messagePrivate.ReceiverName = '';
        messagePrivate.SenderName = '';
        messagePrivate.CountNotRead = '';

        params.push(JSON.stringify(messagePrivate));
          params.push(JSON.stringify('0'));
          params.push(JSON.stringify('fa'));
          this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'DeleteMessageAdmin' , params ,
          (error: ServerError , msg: Message) => {
            if (error === ServerError.None) {
              const message = 'انجام شد';
              const action = 'حذف پیام';
              this.getAllMessage();
              this.snackBar.open(message, action, {
                duration: 2000,
              });
            }
         });
      });
    }
    });
  }


//   openSearchDialog() {
//     const dialogRef = this.dialog.open(NewsNewsSearchComponent, {
//     height: '500px',
//     data: { startDate: this.startDate, endDate: this.endDate, title: this.title, code: this.code, type: this.type  }
//     });
  
//     dialogRef.afterClosed().subscribe(data => {
//       debugger;
//       console.log(data);
//       if (data.startDate) {
//         const input = data.startDate.year + '/' + data.startDate.month + '/' + data.startDate.day;
//             const m = moment(input, 'jYYYY/jMM/jDD');
//             if (m.isValid()) {
//               data.startDate = m.format('YYYY/MM/D');
//             }
//           }
//           if (data.endDate) {
//             const input = data.endDate.year + '/' + data.endDate.month + '/' + data.endDate.day;
//                 const m = moment(input, 'jYYYY/jMM/jDD');
//                 if (m.isValid()) {
//                   data.endDate = m.format('YYYY/MM/D');
//                 }
//               }
//       const filter1 = new Filter();
//       filter1.FilterType = FilterType[FilterType.Between];
//       filter1.RefTable = 'Content' ;
//       filter1.FieldName = 'FromDate' ;
//       filter1.FilterValue = data.startDate + '-' + data.endDate;
  
//       const filter2 = new Filter();
//       filter2.FilterType = FilterType[FilterType.Contains];
//       filter2.RefTable = 'Content' ;
//       filter2.FieldName = 'ContentTitle' ;
//       filter2.FilterValue = data.title;
  
//       const filter3 = new Filter();
//       filter3.FilterType = FilterType[FilterType.Contains];
//       filter3.RefTable = 'Content' ;
//       filter3.FieldName = 'ContentTitle' ;
//       filter3.FilterValue = data.title;
  
//       const filterColl = new FilterColl();
//       filterColl.InnerCondition = ConditionType[ConditionType.AND];
//       filterColl.OuterCondition = ConditionType[ConditionType.AND];
      
//       if ( data.endDate && data.startDate && data.title) {
//         filterColl.Filters = [filter1 , filter2];
//       }else if (!data.title) {
//         filterColl.Filters = [filter1];
//       }else if (!data.endDate || !data.startDate) {
//         filterColl.Filters = [filter2];
//       }
  
//       const params: string[] = [];
//       params.push(JSON.stringify([filterColl]));
//       params.push(JSON.stringify('CreatedOn ASC'));
//       params.push(JSON.stringify('0'));
//       params.push(JSON.stringify('100'));
//       params.push(JSON.stringify('fa'));
//       this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'GetNews' , params ,
//        (error: ServerError , msg: Message) => {
//          if (error === ServerError.None) {
//           this.dataSource = JSON.parse(msg.Data);
//          }
//       });
//     });
//   }


  ngOnInit(): void {
      this.getAllMessage();
    }
   private getAllMessage() {
    const startIndex = (this.limit * (this.page - 1) ) ;
        const params: string[] = [];
        params.push(JSON.stringify(null));
        params.push(JSON.stringify('PRIVATE'));
        params.push(JSON.stringify('CreatedOn DESC'));
        params.push(JSON.stringify(startIndex));
        params.push(JSON.stringify('10'));
        params.push(JSON.stringify('fa'));
        this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'GetMessageAdmin' , params ,
         (error: ServerError , msg: Message) => {
             debugger;
           if (error === ServerError.None) {
            this.dataSource = JSON.parse(msg.Data);
            this.total = this.dataSource[0].TotalRow;
            this.loading = false;
           }
        });
    }
  }

