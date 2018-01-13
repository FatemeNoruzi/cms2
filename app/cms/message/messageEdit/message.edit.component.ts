import { Component, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {MessageDeleteComponent} from '../dialogComponent/messageDelete/message.delete.component';
import { HttpService } from '../../../util/decomService.component';
import {ServerError } from '../../../util/enums';
// import {JalaliPipe } from '../../../util/main.pipe.module';

// import { MessagePraivate } from '../../../model/message.private';
import { Message } from '../../../model/message';
import { MessagePrivate } from '../../../model/message.private';
import * as moment from 'jalali-moment';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-message-edit-component',
    templateUrl: 'message.edit.component.html',
    styleUrls: ['./message.edit.component.css'],
    // providers: [
    //   {provide: NgbCalendar, useClass: NgbCalendarPersian},
    //   {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
    // ]
  })
  export class MessageEditComponent {
    public dataMessage;
    public senderUser;
    public isClose;
    public isRead;
    public messageTxt;
    public messageEdit;
    public currentParams = this.route.snapshot.params['id'];
    private editMode = false;

    public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
    // tslint:disable-next-line:max-line-length
    constructor( private route: ActivatedRoute, public snackBar: MdSnackBar,
        public httpServices: HttpService, private router: Router, calendar: NgbCalendar,
        config: NgbDatepickerConfig , public dialog: MdDialog ) {

   }
    private getOneMessage() {
      
      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify(null));
      params.push(JSON.stringify(this.currentParams));
      params.push(JSON.stringify('CreatedOn ASC'));
      params.push(JSON.stringify('0'));
      params.push(JSON.stringify('100'));
      params.push(JSON.stringify('fa'));
      debugger;
      this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'GetOneMessageAdmin' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataMessage = JSON.parse(msg.Data);
          console.log(this.dataMessage);
           this.senderUser = this.dataMessage[0].SenderUserID;
           this.isClose = this.dataMessage[0].IsClose;
           this.isRead = this.dataMessage[0].IsRead;
         }
      });
  }
  private sendMessage() {
    const messagePrivate = new MessagePrivate();
    const obj: string[] = [];
    debugger;
    if( !this.messageEdit ) {
      messagePrivate.RowNum = '';
      messagePrivate.StateMode = '';
  
      messagePrivate.Status = '';
  
      messagePrivate.MESSAGEID = '';
  
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
  
      messagePrivate.MessageParentID = this.currentParams;
  
      messagePrivate.Attribute = '';
  
      messagePrivate.Mobile = '';
  
      messagePrivate.MessageText = this.messageTxt;
  
      messagePrivate.SenderUserID = '01bf640e-096b-4a81-8942-392456783ff9';
  
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
  
      messagePrivate.ReceiverUserID = this.senderUser;
  
      messagePrivate.DocumentName = '';
  
      messagePrivate.DocumentExtension = '';
  
      messagePrivate.ReceiverName = '';
  
      messagePrivate.SenderName = '';
  
      messagePrivate.CountNotRead = '';
      obj.push(JSON.stringify(messagePrivate));
      obj.push(JSON.stringify('2'));
      obj.push(JSON.stringify('fa'));
      debugger;
      this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertMessageAdmin' , obj ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'افزودن پیام جدید';
          this.getOneMessage();
          this.messageTxt = '';
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
    });
    }else {
      debugger;
      messagePrivate.RowNum = this.messageEdit.RowNum;
      messagePrivate.StateMode = this.messageEdit.StateMode;
      messagePrivate.Status = this.messageEdit.Status;
      messagePrivate.MESSAGEID = this.messageEdit.MESSAGEID;
      messagePrivate.NationalCode = this.messageEdit.NationalCode;
      messagePrivate.CreatedBy = this.messageEdit.CreatedBy;
      messagePrivate.CreatedOn = this.messageEdit.CreatedOn;
      messagePrivate.DataAreaID = this.messageEdit.DataAreaID;
      messagePrivate.ModifiedOn = this.messageEdit.ModifiedOn;
      messagePrivate.Email = this.messageEdit.Email;
      messagePrivate.ModifiedBy = this.messageEdit.ModifiedBy;
      messagePrivate.LanguageCode = 'fa';
      messagePrivate.Tell = this.messageEdit.Tell;
      messagePrivate.MessageTypeID = this.messageEdit.MessageTypeID;
      messagePrivate.MessageParentID = this.messageEdit.MessageParentID;
      messagePrivate.Attribute = this.messageEdit.Attribute ;
      messagePrivate.Mobile = this.messageEdit.Mobile;
      messagePrivate.MessageText = this.messageTxt;
      messagePrivate.SenderUserID = this.messageEdit.SenderUserID;
      messagePrivate.SendDate = this.messageEdit.SendDate;
      messagePrivate.MessageTitle = this.messageEdit.MessageTitle;
      messagePrivate.FullName = this.messageEdit.FullName;
      messagePrivate.TrackingCode = this.messageEdit.TrackingCode;
      messagePrivate.Description = this.messageEdit.Description;
      messagePrivate.IndexMessage = this.messageEdit.IndexMessage;
      messagePrivate.MessageCode = this.messageEdit.MessageCode;
      messagePrivate.TypeIndex = this.messageEdit.TypeIndex;
      messagePrivate.ReceiverUserID = '01bf640e-096b-4a81-8942-392456783ff9';
      messagePrivate.DocumentName = this.messageEdit.DocumentName;
      messagePrivate.DocumentExtension = this.messageEdit.DocumentExtension;
      messagePrivate.ReceiverName = this.messageEdit.ReceiverName;
      messagePrivate.SenderName = this.messageEdit.SenderName;
      messagePrivate.CountNotRead = this.messageEdit.CountNotRead;
      messagePrivate.IsClose = this.messageEdit.IsClose;
      messagePrivate.IsShow = this.messageEdit.IsShow;
      messagePrivate.IsRead = this.messageEdit.IsRead;
    obj.push(JSON.stringify(messagePrivate));
    obj.push(JSON.stringify('2'));
    obj.push(JSON.stringify('update'));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertUpdateMessageAdmin' , obj ,
    (error: ServerError , msg: Message) => {
      if (error === ServerError.None) {
        const message = 'انجام شد';
        const action = 'ویرایش پیام ';
        this.getOneMessage();
        this.messageEdit = '';
        this.messageTxt = '';
        this.editMode = false;
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  });

  }

  }


  private ChangeStatusMessage(MESSAGE , item , status) {
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
      messagePrivate.IsClose = MESSAGE.IsClose;

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

        messagePrivate.IsClose = MESSAGE.IsClose;

      obj.push(JSON.stringify(messagePrivate));
      obj.push(JSON.stringify('2'));
      obj.push(JSON.stringify('update'));
      obj.push(JSON.stringify('fa'));

      this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'InsertUpdateMessageAdmin' , obj ,
        (error: ServerError , msg: Message) => {
          if (error === ServerError.None) {
            this.getOneMessage();
            const message = 'انجام شد';
            const action = 'ویرایش پیام';
            this.snackBar.open(message, action, {
              duration: 2000,
            });
          }
      });
   }

  private editMessage(Message , TXT) {
    this.messageTxt = TXT;
    this.messageEdit = Message;
    this.editMode = true;
  }

  private deletMessage(ID) {
    const dialogRef = this.dialog.open(MessageDeleteComponent, {
      height: '350px',
      });
      dialogRef.afterClosed().subscribe(result => {
        debugger;
      if ( result === true) {
        const messagePrivate = new MessagePrivate();
        const params: string[] = [];
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
    
        messagePrivate.IsClose = '';
    
        messagePrivate.ReceiverUserID = '';
    
        messagePrivate.DocumentName = '';

        messagePrivate.DocumentExtension = '';

        messagePrivate.ReceiverName = '';
        messagePrivate.SenderName = '';
        messagePrivate.CountNotRead = '';
        params.push(JSON.stringify(messagePrivate));
          params.push(JSON.stringify('2'));
          params.push(JSON.stringify('fa'));
          this.httpServices.requset('DecomMISBLL' , 'MESSAGEControlLogic' , 'DeleteMessage' , params ,
          (error: ServerError , msg: Message) => {
            if (error === ServerError.None) {
              const message = 'انجام شد';
              const action = 'حذف پیام';
              this.getOneMessage();
              this.snackBar.open(message, action, {
                duration: 2000,
              });
            }
         });
      }
      });

  }

  private closeEditMode() {
    this.editMode = false;
    this.messageTxt = '';
    this.messageEdit = '';
  }

  private readMessage(ID) {

  }


  ngOnInit() {
      this.getOneMessage();
  }
}