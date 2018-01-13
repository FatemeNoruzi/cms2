import { Component, Inject, EventEmitter,  ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Spotlight } from '../../../model/spotlight';
import { Message } from './../../../model/message';
import { HttpService } from './../../../util/decomService.component';
import {ServerError } from './../../../util/enums';
import {ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import {MdSnackBar} from '@angular/material';

@Component({
    selector: 'app-spotlight-edit-component',
    templateUrl: 'spotlight.edit.component.html',
    styleUrls: ['./spotlight.edit.component.css']
  })
  export class SpotlightEditComponent {
    form: any;
    filteredStates;
    items;
    public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
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
       private GetAllItem() {
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
       private selectedItem(ItemID , ItemName, event) {
        this.selected = false;
         console.log(ItemName);
         this.spotlight.RefID = ItemID;
         this.myInput.nativeElement.value = ItemName;
         console.log(event);
       }
    // public dateout = {year: '', month: '', day: ''};
    
    // tslint:disable-next-line:max-line-length
    constructor( private route: ActivatedRoute, public snackBar: MdSnackBar,  public httpServices: HttpService, private router: Router ) {
   }
    private getOneSpotlight() {
      const currentParams = this.route.snapshot.params['id'];
      const params: string[] = [];
      params.push(JSON.stringify(currentParams));
      params.push(JSON.stringify('fa'));
      this.httpServices.requset('DecomMISBLL' , 'SPOTLIGHTControlLogic' , 'GetOneGetSpotlight' , params ,
       (error: ServerError , msg: Message) => {
         if (error === ServerError.None) {
          this.spotlight = JSON.parse(msg.Data);
          console.log(this.spotlight);
         }
      });
  }

  private EditSpotLight() {
    // debugger;
    // const  fileBrowser = this.fileInput.nativeElement;
    // console.log(fileBrowser.files);
      const spotlight = new  Spotlight();
      const obj: string[] = [];
      spotlight.RowNum = this.spotlight.RowNum;

      spotlight.StateMode = this.spotlight.StateMode;

      spotlight.CreatedBy = this.spotlight.CreatedBy;

      spotlight.IndexShow = this.spotlight.IndexShow;

      spotlight.Desription = this.spotlight.Desription;

      spotlight.IsShow = this.spotlight.IsShow;


      spotlight.ModifiedOn = this.spotlight.ModifiedOn;

      spotlight.Title = this.spotlight.Title;

      spotlight.ModifiedBy = this.spotlight.ModifiedBy;


      spotlight.CreatedOn = this.spotlight.CreatedOn;
      
      spotlight.DataAreaID = this.spotlight.DataAreaID;

      spotlight.SPOTLIGHTID = this.spotlight.SPOTLIGHTID;

      spotlight.DocumentID = this.spotlight.DocumentID;

      spotlight.DocumentName = this.spotlight.DocumentName;

      spotlight.DocumentExtension = this.spotlight.DocumentExtension;

      spotlight.Type = this.spotlight.Type;

      if (spotlight.Type === 'Item') {
        spotlight.RefID = this.spotlight.RefID;
      }else {
        spotlight.RefID = '';
      }
      if (spotlight.Type === 'Content') {
        spotlight.WebContent = this.spotlight.WebContent;
      }else {
        spotlight.WebContent = '';
      }

      if (spotlight.Type === 'Link') {
        spotlight.Link = this.spotlight.Link;
      }else {
        spotlight.Link = '';
      }

    obj.push(JSON.stringify(spotlight));
    obj.push(JSON.stringify('fa'));
    this.httpServices.requset('DecomMISBLL' , 'SPOTLIGHTControlLogic' , 'UpdateSpotlight' , obj ,
    (error: ServerError , msg: Message) => {
      if (error === ServerError.None) {
        const message = 'انجام شد';
        const action = 'ویرایش';
        this.snackBar.open(message, action, {
          duration: 2000,
        });
        this.router.navigate([ '../../', 'index'], { relativeTo: this.route });
      }
   });
  }

    ngOnInit() {
      this.getOneSpotlight();
      this.GetAllItem();
  }
  }