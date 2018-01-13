import { Component, Inject, EventEmitter,  ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Slideshow } from '../../../model/slideshow';
import { Slider } from '../../../model/slider';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import { Message } from '../../../model/message';
import { HttpService } from '../../../util/decomService.component';
import {ServerError } from '../../../util/enums';
import {SlideAddComponent } from './dialogComponent/slideAdd/slide.add.component';
import {SlideDeleteComponent } from './dialogComponent/slideDelete/slide.delete.component';
import {SlideUpdateComponent } from './dialogComponent/slideUpdate/slide.update.component';
import {ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-slideshow-edit-component',
    templateUrl: 'slideshow.edit.component.html',
    styleUrls: ['./slideshow.edit.component.css']
  })
  export class SlideshowEditComponent {
    chipValue: string;
    public slideshow= new  Slideshow();
    public slider= new  Slider();
    public dataSource;
    public slideW;
    public slideH;
    public imageUrl = 'http://192.168.1.25:8750/Service/getFile/';

    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, public dialog: MdDialog,  private router: Router, public httpServices: HttpService, public snackBar: MdSnackBar) {}
    ngOnInit(): void {
      this.getOneSlideshow();
    }
    private getOneSlideshow() {
      debugger;
      const currentParams = this.route.snapshot.params['id'];
      const params: string[] = [];
      params.push(JSON.stringify(currentParams));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SLIDERHEADERControlLogic' , 'GetOneSlider' , params ,
        (error: ServerError , msg: Message) => {
          if (error === ServerError.None) {
            this.slideshow = JSON.parse(msg.Data);

            const res = this.slideshow.Ratio.split(':');
            this.slideW = res[0];
            this.slideH = res[1];
            const data = JSON.parse(msg.Data);
            this.dataSource = data.Sliders;
            console.log(this.slideshow);
          }
        });
    }
    private editSlideshow() {
      const slideshow = new  Slideshow();
      slideshow.RowNum = this.slideshow.RowNum;
      slideshow.StateMode = this.slideshow.StateMode ;
      slideshow.DataAreaID = this.slideshow.DataAreaID;
      slideshow.SliderTitle = this.slideshow.SliderTitle;
      slideshow.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      slideshow.SpeedRate = this.slideshow.SpeedRate;
      slideshow.MinWidth = this.slideshow.MinWidth;
      slideshow.Ratio = this.slideW + ':' + this.slideH;
      slideshow.SlideName = this.slideshow.SlideName;
      slideshow.NumberSlides = this.slideshow.NumberSlides;
      slideshow.Status = this.slideshow.Status;
      slideshow.Duration = this.slideshow.Duration;
      slideshow.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      slideshow.SLIDERHEADERID = this.slideshow.SLIDERHEADERID;
      slideshow.Attribute = this.slideshow.Attribute;
      slideshow.MaxWidth = this.slideshow.MaxWidth;
      slideshow.CreatedOn = this.slideshow.CreatedOn;
      slideshow.ModifiedOn = '';
      slideshow.Entity = 'ITEM';
      slideshow.EntityName = this.slideshow.EntityName;
      const obj: string[] = [];
      obj.push(JSON.stringify(slideshow));
      obj.push(JSON.stringify('fa'));
      debugger;
      this.httpServices.requset('DecomMISBLL' , 'SLIDERHEADERControlLogic' , 'UpdateSlider' , obj ,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'ویرایش اطلاعات اسلایدر';
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
     });
    }

    openDialogAddSlideComponent() {
      debugger;
      if (Number(this.slideshow.NumberSlides) > this.slideshow.Sliders.length ) {
        const dialogRef = this.dialog.open(SlideAddComponent, {
          height: '500px',
          width: '500px',
          data: {}
          });
          dialogRef.afterClosed().subscribe(data => {
            debugger;
            console.log(data);
            const slider = new  Slider();
            const currentParams = this.route.snapshot.params['id'];
            slider.RowNum = '';

            slider.StateMode = '';

            slider.DataAreaID = '';

            slider.Attribute = '';

            slider.SLIDERDETAILID = '';

            slider.DocumentID = '';

            slider.Link = data.Link;

            slider.ForeColor = data.ForeColor ;

            slider.RefID = data.Ref;

            slider.Status = '';

            slider.ModifiedOn = '';

            slider.IndexShow = data.IndexShow ;

            slider.Description = data.Description;

            slider.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';

            slider.CreatedOn = '';

            slider.SliderHeaderID = currentParams;

            slider.BackColor = data.BackColor ;
            slider.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
            const obj: string[] = [];
            obj.push(JSON.stringify(slider));
            obj.push(JSON.stringify('fa'));
            this.httpServices.requset('DecomMISBLL' , 'SLIDERDETAILControlLogic' , 'Insert' , obj ,
            (error: ServerError , msg: Message) => {
              if (error === ServerError.None) {
                const message = 'انجام شد';
                const action = 'افزودن اسلاید جدید';
                this.getOneSlideshow();
                this.snackBar.open(message, action, {
                  duration: 2000,
                });
              }
           });
        })
      }else{
        alert('تعداد اسلایدر موجود با بیشترین تعداد اسلایدر برابر است');
      }
  }

  openDialogUpdateSlideComponent(item) {
    const ForeColorObj = item.ForeColor.split('-');
    item.ForeColor = ForeColorObj[0];
    item.ForeColorAlpha = ForeColorObj[1];

    const BackColorObj = item.BackColor.split('-');
    item.BackColor = BackColorObj[0];
    item.BackColorAlpha = BackColorObj[1];
    const dialogRef = this.dialog.open(SlideUpdateComponent, {
    height: '600px',
    width: '500px',
    data: item
    });
    dialogRef.afterClosed().subscribe(data => {
      debugger;
      console.log(data);
      const slider = new  Slider();
      const currentParams = this.route.snapshot.params['id'];
      slider.RowNum = data.RowNum;

      slider.StateMode = data.StateMode;

      slider.DataAreaID = data.DataAreaID;

      slider.Attribute = data.Attribute;

      slider.SLIDERDETAILID = data.SLIDERDETAILID;

      slider.DocumentID = data.DocumentID;

      if (data.Radio == 2) {
        slider.Link = data.Link;
      }else {
        slider.Link = '';
      }


      if (data.Radio == 1) {
        slider.RefID = data.RefID;
      }else {
        slider.RefID = '';
      }

      slider.ForeColor = data.ForeColor;
      slider.Status = data.Status;

      slider.ModifiedOn = '';

      slider.IndexShow = data.IndexShow ;

      slider.Description = data.Description;

      slider.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';

      slider.CreatedOn = data.CreatedOn;

      slider.SliderHeaderID = data.SliderHeaderID;

      slider.BackColor = data.BackColor ;
      slider.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
      const params: string[] = [];
      params.push(JSON.stringify(slider));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SLIDERDETAILControlLogic' , 'Update' , params,
      (error: ServerError , msg: Message) => {
        if (error === ServerError.None) {
          const message = 'انجام شد';
          const action = 'ویرایش اسلاید ';
          this.getOneSlideshow();
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
     });
  });
}

  openDialogDeleteSlideComponent(item) {
    const dialogRef = this.dialog.open(SlideDeleteComponent, {
    height: '350px',

    });

    dialogRef.afterClosed().subscribe(result => {
    if ( result === true) {
        const slider = new  Slider();
        const currentParams = this.route.snapshot.params['id'];
        slider.RowNum = item.RowNum;

        slider.StateMode = item.StateMode;

        slider.DataAreaID = item.DataAreaID;

        slider.Attribute = item.Attribute;

        slider.SLIDERDETAILID = item.SLIDERDETAILID;

        slider.DocumentID = item.DocumentID;

        slider.Link = item.Link;

        slider.ForeColor = item.ForeColor;

        slider.RefID = item.RefID;

        slider.Status = item.Status;

        slider.ModifiedOn = item.ModifiedOn;

        slider.IndexShow = item.IndexShow ;

        slider.Description = item.Description;

        slider.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';

        slider.CreatedOn = item.CreatedOn;

        slider.SliderHeaderID = item.SliderHeaderID;

        slider.BackColor = item.BackColor;
        slider.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
        const params: string[] = [];
        params.push(JSON.stringify(slider));
        params.push(JSON.stringify('fa'));
        this.httpServices.requset('DecomMISBLL' , 'SLIDERDETAILControlLogic' , 'Delete' , params ,
        (error: ServerError , msg: Message) => {
          if (error === ServerError.None) {
            const message = 'انجام شد';
            const action = ' حذف اسلاید ';
            this.getOneSlideshow();
            this.snackBar.open(message, action, {
              duration: 2000,
            });
          }
       });
    }
    });
  }
}