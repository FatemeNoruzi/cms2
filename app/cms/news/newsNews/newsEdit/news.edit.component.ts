import { Component, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import { HttpService } from '../../../../util/decomService.component';
import {ServerError } from '../../../../util/enums';
// import {JalaliPipe } from '../../../util/main.pipe.module';

import { News } from '../../../../model/news';
import { Message } from '../../../../model/message';
import * as moment from 'jalali-moment';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-news-edit-component',
    templateUrl: 'news.edit.component.html',
    styleUrls: ['./news.edit.component.css'],
    providers: [
      {provide: NgbCalendar, useClass: NgbCalendarPersian},
      {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
    ]
  })
  export class NewsEditComponent {
    public dataNews;
    private today: NgbDateStruct;
    form: any;
    dateout: NgbDateStruct;
    // public dateout = {year: '', month: '', day: ''};
    public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
    // tslint:disable-next-line:max-line-length
    constructor( private route: ActivatedRoute, public snackBar: MdSnackBar,  public httpServices: HttpService, private router: Router, calendar: NgbCalendar, config: NgbDatepickerConfig  ) {
      this.today = calendar.getToday();
   }
    chipValue: string;
    chips = [
    ]
    remove(item) {
      this.chips.splice(item, 1);
    }
    add(value) {
      // console.log(value);
      this.chips.push(value);
      this.chipValue = '';
    }
    removeByKey(value) {
      // console.log(event)
      if (value.length < 1) {
        if (this.chips.length > 0) {
          this.chips.pop();
        }
      }
    }
    private geSpecialtItems() {
      const currentParams = this.route.snapshot.params['id'];
      const params: string[] = [];
      params.push(JSON.stringify(currentParams));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'GetOneNews' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.dataNews = JSON.parse(msg.Data);
          if (this.dataNews.FromDate) {
            const input = this.dataNews.FromDate;
            const m = moment(input);
            if (m.isValid()) {
              this.dataNews.FromDate = {
                year: parseInt(m.format('jYYYY'), 10),
                month: parseInt(m.format('jMM'), 10),
                day: parseInt(m.format('jDD'), 10)
              };
              console.log(this.dataNews.FromDate);
            }
          }
         }
      });
  }
  private editNews() {
    if (this.dataNews.FromDate) {
      const input = this.dataNews.FromDate.year + '/' + this.dataNews.FromDate.month + '/' + this.dataNews.FromDate.day;
          const m = moment(input, 'jYYYY/jMM/jDD');
          if (m.isValid()) {
            this.dataNews.FromDate = m.format('YYYY/MM/D');
          }
        }
    const news = new  News();
    const obj: string[] = [];
    news.RowNum = this.dataNews.RowNum;
    news.StateMode = '';
    news.CONTENTID = this.dataNews.CONTENTID;
    news.ToDate = this.dataNews.ToDate;
    news.CreatedBy = '07ed7990-85e9-49ee-8371-b5db30d49e0f';
    news.ModifiedOn = '';
    news.StatusShow = this.dataNews.StatusShow;
    news.CreatedOn = '';
    news.DataAreaID = this.dataNews.DataAreaID;
    news.ContentTitle = this.dataNews.ContentTitle;
    news.ContentText = this.dataNews.ContentText;
    news.Attribute = 'USER';
    news.FromDate = this.dataNews.FromDate;
    news.ContentTypeID = this.dataNews.ContentTypeID;
    news.Status = '';
    news.ModifiedBy = '07ed7990-85e9-49ee-8371-b5db30d49e0f';
    news.LanguageCode = 'fa';
    news.DocumentTypeTitle = '';
    news.ContentWeb = this.dataNews.ContentWeb;
    news.DocumentExtension = '';
    news.ContentTypeTitle = '';
    news.DOCUMENTID = '';
    news.ContentCode = this.dataNews.ContentCode;
    news.DocumentName = '';
    obj.push(JSON.stringify(news));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('JansuBLL' , 'JaContentControlLogic' , 'UpdateNews' , obj ,
    (error: ServerError , msg: Message) => {
     const message = 'ویرایش';
     const  action = 'انجام شد';
      if (error === ServerError.None) {
            this.snackBar.open(message, action, {
              duration: 2000,
            });
            this.router.navigate([ '../../', 'index'], { relativeTo: this.route });
      }
   });

  }

    ngOnInit() {
      this.geSpecialtItems();
  }
}