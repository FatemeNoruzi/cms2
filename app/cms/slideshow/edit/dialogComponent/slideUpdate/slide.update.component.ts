import { Component, Inject, EventEmitter, ViewChild  } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../../../../util/decomService.component';
import {ServerError } from '../../../../../util/enums';
import { Slideshow } from '../../../../../model/slideshow';
import { Slider } from '../../../../../model/slider';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar} from '@angular/material';
import { Message } from '../../../../../model/message';
import {ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({
    selector: 'app-slide-update-component',
    templateUrl: 'slide.update.component.html',
    styleUrls: ['./slide.update.component.css']
  })
  export class SlideUpdateComponent {
      stateCtrl: FormControl;
      filteredStates;
      public slideshow= new  Slideshow();
      public slider= new  Slider();
      public items;
      public Ref;
      public selected = false;
      public imageUrl = 'http://192.168.1.25:8750/Service/getFile/';
      @ViewChild('myInput') myInput;
      @ViewChild('BackColor') BackColor;
      @ViewChild('ForeColor') ForeColor;
  
      updateBColorAlpha (alpha) {
        debugger;
        this.BackColor.nativeElement.style.opacity = alpha;
    }
    updateFColorAlpha (alpha) {
      debugger;
      this.ForeColor.nativeElement.style.opacity = alpha;
  }

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

      // tslint:disable-next-line:max-line-length
      constructor(public dialogRef: MatDialogRef<SlideUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any ,  private router: Router, public httpServices: HttpService, public snackBar: MdSnackBar) {}

        ngOnInit(): void {
          this.GetAllItem();
          if (this.data.RefID) {
            this.data.Radio = 1;
          }
          if (this.data.Link) {
            this.data.Radio = 2;
          }
        }
       private selectedItem(ItemID , ItemName, event) {
         this.selected = false;
          console.log(ItemName);
          this.data.RefID = ItemID;
          this.myInput.nativeElement.value = ItemName;
          console.log(event);
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
              debugger;
              if (this.data.RefID) {
                this.items.forEach(element => {
                  if (element.ITEMID === this.data.RefID) {
                    this.Ref = element.ItemName;
                  }
                });
              }
            }
          });
      }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }