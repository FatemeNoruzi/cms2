import { Component, Inject, EventEmitter,  ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { News } from '../../../../model/news';
import { Message } from '../../../../model/message';
import { HttpService } from '../../../../util/decomService.component';
import {ServerError } from '../../../../util/enums';
import {ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import {MdSnackBar} from '@angular/material';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-news-news-add-component',
    templateUrl: 'news.news.add.component.html',
    styleUrls: ['./news.news.add.component.css'],
    providers: [
      {provide: NgbCalendar, useClass: NgbCalendarPersian},
      {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
    ]
  })
  export class NewsNewsAddComponent {
    @ViewChild('fileInput') fileInput;
    chipValue: string;
    public dataNews= new  News();
    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, private router: Router, public httpServices: HttpService, public snackBar: MdSnackBar) {}
    chips = [
    ];
    remove(item) {
      this.chips.splice(item, 1);
    }
    add(value) {
      this.chips.push(value);
      this.chipValue = '';
    }
    removeByKey(value) {
      if (value.length < 1) {
        if (this.chips.length > 0) {
          this.chips.pop();
        }
      }
    }

    private addNews() {
      debugger;
      const  fileBrowser = this.fileInput.nativeElement;
      console.log(fileBrowser.files);
      const news = new  News();
      const obj: string[] = [];
      news.RowNum = '';
      news.StateMode = '';
      news.CONTENTID = '';
      // news.ToDate = this.dataNews.ToDate;
      news.CreatedBy = '07ed7990-85e9-49ee-8371-b5db30d49e0f';
      news.ModifiedOn = '';
      news.StatusShow = this.dataNews.StatusShow;
      news.CreatedOn = '';
      news.DataAreaID = '';
      news.ContentTitle = this.dataNews.ContentTitle;
      news.ContentText = this.dataNews.ContentText;
      news.Attribute = 'USER';
      news.FromDate = '';
      news.ContentTypeID = '';
      news.Status = '';
      news.ModifiedBy = '07ed7990-85e9-49ee-8371-b5db30d49e0f';
      news.LanguageCode = 'fa';
      news.DocumentTypeTitle = '';
      news.ContentWeb = this.dataNews.ContentWeb;
      news.DocumentExtension = '';
      news.ContentTypeTitle = '';
      news.DOCUMENTID = '';
      news.ContentCode = '';
      news.DocumentName = '';
      obj.push(JSON.stringify(news));
      obj.push(JSON.stringify('fa'));
      this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'InsertNews' , obj ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'افزودن خبر جدید';
          this.snackBar.open(message, action, {
            duration: 2000,
          });
          this.router.navigate([ '../', 'index'], { relativeTo: this.route });
        }
     });
    }
  }