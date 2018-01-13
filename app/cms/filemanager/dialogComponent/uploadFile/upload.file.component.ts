import { Component, Inject, EventEmitter, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../../../util/decomService.component';
import { FilterType, ServerError, ConditionType } from '../../../../util/enums';
import { Message } from '../../../../model/message';

@Component({
    selector: 'app-upload-file-component',
    templateUrl: 'upload.file.component.html',
    styleUrls: ['./upload.file.component.css']
  })
  export class UploadFileComponent {
    public imageUrl = 'http://192.168.1.102:8750/Service/getFile/';
    yourName = '';
    public sizeFile;
    public ElImg;
    public url;
    public w;
    public h;
    entity;
    types;
    selectedType;
    selectedItem;
    items;
    @ViewChild('fileInput') fileInput;
  //   public url = this.imageUrl + this.selectedType.DocumentName + '/' + this.selectedType.DocumentExtension;
    @ViewChild('img') img;
    constructor(
      public dialogRef: MatDialogRef<UploadFileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, public httpServices: HttpService) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

    checkRatio( MinWidth , MaxWidth , Ratio , w , h ) {
      const ratio = Ratio.split(':');
      const WH = ratio[0] + '.' + ratio[1];
      const WHInt = parseInt(WH, 10);
      const ElImgHeight = parseInt(h, 10);


      const MinHeight = WHInt * MinWidth;
      const MaxHeight = WHInt * MaxWidth;
      const MinTolerance = w - (.01 * w);
      const MaxTolerance = w + (.01 * w);
      if ( MinWidth < w < MaxWidth &&
          ElImgHeight < MaxHeight && MinHeight < ElImgHeight &&
          MinTolerance < h < MaxTolerance) {
            debugger;
          this.data.file = this.fileInput.nativeElement.files[0];
          this.data.name = this.fileInput.nativeElement.files[0].name;
          return true;
          }else {
            alert( 'نسبت عرض به طول عکس باید ' + Ratio + 'باشد');
          }
    }

    checkEx(event: any) {
      debugger;
      const ImageExtention  = ['jpeg', 'bmp', 'png', 'jpg' ];
      const VideoExtention = ['3gp', 'mp4'];
      const AudioExtention = ['mp3', 'wav', 'flac', 'mid', 'xmf', 'mxmf', 'rtttl', 'rtx', 'ota', 'imy'];
      const DocExtention = ['pdf', 'docx', 'txt'];
      const fileBrowser = this.fileInput.nativeElement;
      this.ElImg = this.img.nativeElement;

        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          this.sizeFile = event.target.files[0].size / 1024;
          this.data.file = fileBrowser.files[0];
          this.data.name = fileBrowser.files[0].name;
                          const ext = fileBrowser.files[0].name.split('.').pop();
                          if(this.selectedType){
                          if (this.selectedType.Label === 'Image') {

                            if ( ImageExtention.indexOf(ext) === -1) {
                              alert('فایل انتخاب شده باید عکس باشد');
                              this.fileInput.nativeElement.files[0] = '';
                            }else {
                              reader.onload = ( event: any) => {
                                const img = new Image();
                                this.url = event.target.result;
                                img.onload = ( event: any) => {
                                  this.w = img.width;
                                  this.h = img.height;
                                  if (this.w) {
                              // tslint:disable-next-line:max-line-length
                              if (this.checkRatio( this.selectedType.MinWidth , this.selectedType.MaxWidth , this.selectedType.Ratio , this.w , this.h )
                            && this.sizeFile < this.selectedType.FileSize) {
                                  this.data.file = fileBrowser.files[0];
                                }else {
                                  alert('سایز فایل انتخاب شده مناسب نمیباشد ' + 'طول و عرض عکس باید بین' +
                                   this.selectedType.MinWidth + '_' + this.selectedType.MaxWidth + 'باشد');
                                  this.url = '';
                                }
                              }

                            };
                            img.src = event.target.result;

                          };
                          reader.readAsDataURL(event.target.files[0]);
                        }

                          }
                          else if (this.selectedType.Label === 'Video') {
                            if (this.sizeFile > this.selectedType.FileSize) {
                              alert( 'بیشتر باشد' + this.selectedType.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
                            }
                            if ( VideoExtention.indexOf(ext) === -1) {
                              alert('فایل انتخاب شده باید ویدیو باشد');
                              this.fileInput = '';
                            }else {
                              this.data.file = fileBrowser.files[0];
                            }

                          }else if (this.selectedType.Label === 'Sound') {
                            if (this.sizeFile > this.selectedType.FileSize) {
                              alert( 'بیشتر باشد' + this.selectedType.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
                            }
                            if ( AudioExtention.indexOf(ext) === -1) {
                              alert('فایل انتخاب شده باید صدا باشد');
                              this.fileInput = '';
                            }else {
                              this.data.file = fileBrowser.files[0];
                            }

                          }else if (this.selectedType.Label === 'Text') {
                            if (this.sizeFile > this.selectedType.FileSize) {
                              alert( 'بیشتر باشد' + this.selectedType.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
                            }
                            if ( DocExtention.indexOf(ext) === -1) {
                              alert('فایل انتخاب شده باید متن باشد');
                              this.fileInput = '';
                            }else {
                              this.data.file = fileBrowser.files[0];
                            }
                          }
                        }else {
                          debugger;
                          this.data.file = fileBrowser.files[0];
                        }

                }else {
                this.checkEx(event);
                }
    }
ngOnInit(){
this.getAllEntity();
}

getAllEntity() {
        const params: string[] = [];
        params.push(JSON.stringify('fa'));
        this.httpServices.requset('DecomMISBLL' , 'DOCUMENTTYPEControlLogic' , 'GetEntityDocument' , params ,
         (error: ServerError , msg: Message) => {
           if (error === ServerError.None) {
            this.entity = JSON.parse(msg.Data);
            console.log(this.entity );
           }
        });

}

GetAllType(entity) {
  this.data.entityName = entity;
  const params: string[] = [];
  params.push(JSON.stringify(entity));
  params.push(JSON.stringify('fa'));
  this.httpServices.requset('DecomMISBLL' , 'DOCUMENTTYPEControlLogic' , 'GetDocTypeList' , params ,
   (error: ServerError , msg: Message) => {
     if (error === ServerError.None) {
      this.types = JSON.parse(msg.Data);
      console.log(this.types );
     }
  });
  // const obj: string[] = [];
  // obj.push(JSON.stringify(entity));
  // obj.push(JSON.stringify('fa'));
  // this.httpServices.requset('DecomMISBLL' , 'DOCUMENTControlLogic' , 'GetListRef' , obj ,
  //  (error: ServerError , msg: Message) => {
  //    if (error === ServerError.None) {
  //     this.items = JSON.parse(msg.Data);
  //     console.log(this.items );
  //    }
  // });
}

SelectType(selectedType) {
  this.data.selectedType = selectedType;
}

// SelectItem(RefId) {
//   this.data.refID = RefId;
// }

// GetProType(type) {
// console.log(type);
// }
}
