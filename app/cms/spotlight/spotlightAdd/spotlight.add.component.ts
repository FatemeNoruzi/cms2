import { Component, Inject, EventEmitter,  ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Spotlight } from '../../../model/spotlight';
import { Message } from './../../../model/message';
import { HttpService } from './../../../util/decomService.component';
import {ServerError } from './../../../util/enums';
import {ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import {MdSnackBar} from '@angular/material';
// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
@Component({
    selector: 'app-spotlight-add-component',
    templateUrl: 'spotlight.add.component.html',
    styleUrls: ['./spotlight.add.component.css']
  })
  export class SpotlightAddComponent {
    filteredStates;
    items;
    public spotlight = new Spotlight();
    selected = false;
    types = [
      {value: 'کالا', id: 'Item'},
      {value: 'محتوا', id: 'Content'},
      {value: 'لینک', id: 'Link'}
    ];
    @ViewChild('myInput') myInput;

    assignCopy() {
      this.filteredStates = Object.assign([], this.items);
      console.log(this.filteredStates);
    }
    filterItem(value) {
     this.selected = true;
      if (!value) {
        this.assignCopy();
       }
      this.filteredStates = Object.assign([], this.items).filter(
         item => item.ItemName.indexOf(value) > -1
      );
      console.log(this.filteredStates);
   }
   private selectedItem(ItemID , ItemName, event) {
    this.selected = false;
     console.log(ItemName);
     this.spotlight.RefID = ItemID;
     this.myInput.nativeElement.value = ItemName;
     console.log(event);
   }
    // @ViewChild('fileInput') fileInput;
    // chipValue: string;
    // public dataNews= new  News();
    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, private router: Router, public httpServices: HttpService, public snackBar: MdSnackBar) {}

    ngOnInit(): void {
      this.GetAllItem();
    }

    private GetAllItem(){
      const params: string[] = [];
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('01bf640e-096b-4a81-8942-392456783ff9'));
      params.push(JSON.stringify('ITEMID ASC'));
      params.push(JSON.stringify('1'));
      params.push(JSON.stringify('1000'));
      params.push(JSON.stringify(null));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'ITEMControlLogic' , 'GetItems' , params ,
        (error: ServerError , msg: Message) => {
          if (error === ServerError.None) {
            this.items = JSON.parse(msg.Data);
            this.assignCopy();
            console.log(this.items);
          }
        });
    }
    // chips = [
    // ];
    // remove(item) {
    //   this.chips.splice(item, 1);
    // }
    // add(value) {
    //   this.chips.push(value);
    //   this.chipValue = '';
    // }
    // removeByKey(value) {
    //   if (value.length < 1) {
    //     if (this.chips.length > 0) {
    //       this.chips.pop();
    //     }
    //   }
    // }

    private AddSpotLight() {
      // debugger;
      // const  fileBrowser = this.fileInput.nativeElement;
      // console.log(fileBrowser.files);
        const spotlight = new  Spotlight();
        const obj: string[] = [];
        spotlight.RowNum = '';
        
        spotlight.StateMode = '';
        
        spotlight.CreatedBy = '01bf640e-096b-4a81-8942-392456783ff9';
        
        spotlight.IndexShow = this.spotlight.IndexShow;
        
        spotlight.Desription = this.spotlight.Desription;
        
        spotlight.IsShow = '';
        
        spotlight.RefID = this.spotlight.RefID;
        
        spotlight.WebContent = this.spotlight.WebContent;
        
        spotlight.ModifiedOn = '';
        
        spotlight.Type = this.spotlight.Type;
        
        spotlight.Title = this.spotlight.Title;
        
        spotlight.ModifiedBy = '01bf640e-096b-4a81-8942-392456783ff9';
        
        spotlight.Link = this.spotlight.Link;
        
        spotlight.CreatedOn = '';
        
        spotlight.DataAreaID = '';
        
        spotlight.SPOTLIGHTID = '';
        
        spotlight.DocumentID = '';
        
        spotlight.DocumentName = '';
        
        spotlight.DocumentExtension = '';
      obj.push(JSON.stringify(spotlight));
      obj.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SPOTLIGHTControlLogic' , 'InsertSpotlight' , obj ,
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