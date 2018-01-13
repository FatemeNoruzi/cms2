import { Component, Inject, EventEmitter,  ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Slideshow } from '../../../model/slideshow';
import { Message } from '../../../model/message';
import { HttpService } from '../../../util/decomService.component';
import {ServerError } from '../../../util/enums';
import {ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import {MdSnackBar} from '@angular/material';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-slideshow-add-component',
    templateUrl: 'slideshow.add.component.html',
    styleUrls: ['./slideshow.add.component.css']
  })
  export class SlideshowAddComponent {
    chipValue: string;
    public slideshow= new  Slideshow();
    public slideW ;
    public slideH;
    Entity = [
      {id: 'Steak', value: 'Steak'},
      {id: 'Pizza', value: 'Pizza'},
      {id: 'Tacos', value: 'Tacos'}
    ];
    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, private router: Router, public httpServices: HttpService, public snackBar: MdSnackBar) {}

    private addSlideshow() {
      debugger;
      const slideshow = new  Slideshow();
      slideshow.RowNum = '';
      slideshow.StateMode = '';
      slideshow.DataAreaID = '';
      slideshow.SliderTitle = this.slideshow.SliderTitle;
      slideshow.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      slideshow.SpeedRate = this.slideshow.SpeedRate;
      slideshow.MinWidth = this.slideshow.MinWidth;
      slideshow.Ratio = this.slideW + ':' + this.slideH;
      slideshow.SlideName = this.slideshow.SlideName;
      slideshow.NumberSlides = this.slideshow.NumberSlides;
      slideshow.Status = '';
      slideshow.Duration = this.slideshow.Duration;
      slideshow.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      slideshow.SLIDERHEADERID = '';
      slideshow.Attribute = '';
      slideshow.MaxWidth = this.slideshow.MaxWidth;
      slideshow.CreatedOn = '';
      slideshow.ModifiedOn = '';
      slideshow.Entity = 'ITEM';
      slideshow.EntityName = '';
      const obj: string[] = [];
      obj.push(JSON.stringify(slideshow));
      obj.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SLIDERHEADERControlLogic' , 'InsertSlider' , obj ,
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