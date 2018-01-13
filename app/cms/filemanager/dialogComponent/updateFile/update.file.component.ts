import { Component, Inject, EventEmitter, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-update-file-component',
    templateUrl: 'update.file.component.html',
    styleUrls: ['./update.file.component.css']
  })
  export class UpdateFileComponent {
    public imageUrl = 'http://192.168.1.25:8750/Service/getFile/';
    yourName = '';
    public sizeFile;
    public ElImg;
    public w;
    public h;
    @ViewChild('fileInput') fileInput;
    public url = this.imageUrl + this.data.updateObj.DocumentName + '/' + this.data.updateObj.DocumentExtension;
    @ViewChild('img') img;
    constructor(
      public dialogRef: MatDialogRef<UpdateFileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
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
          this.data.file = this.fileInput.nativeElement.files[0];
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
        const ext = fileBrowser.files[0].name.split('.').pop();
        if (this.data.updateObj.TypeName === 'Image') {
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
                  if (this.data.updateObj.MinWidth) {
                    if (this.checkRatio( this.data.updateObj.MinWidth ,
                        this.data.updateObj.MaxWidth , this.data.updateObj.Ratio ,
                        this.w , this.h )
                        && this.sizeFile < this.data.updateObj.FileSize) {
                          this.data.file = fileBrowser.files[0];
                        }else {
                          alert('سایز فایل انتخاب شده مناسب نمیباشد ' + 'طول و عرض عکس باید بین' +
                          this.data.updateObj.MinWidth + '_' + this.data.updateObj.MaxWidth + 'باشد');
                          this.url = '';
                        }
                  }else {
                    this.data.file = fileBrowser.files[0];
                  }

              };
              img.src = event.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
        }

        }else if (this.data.updateObj.TypeName === 'Video') {
          if (this.sizeFile > this.data.updateObj.FileSize) {
            alert( 'بیشتر باشد' + this.data.updateObj.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
          }

          if ( VideoExtention.indexOf(ext) === -1) {
            alert('فایل انتخاب شده باید ویدیو باشد');
            this.fileInput = '';
          }else {
            this.data.file = fileBrowser.files[0];
          }


        }else if (this.data.updateObj.TypeName === 'Sound') {

          if (this.sizeFile > this.data.updateObj.FileSize) {
            alert( 'بیشتر باشد' + this.data.updateObj.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
          }
          if ( AudioExtention.indexOf(ext) === -1) {
            alert('فایل انتخاب شده باید صدا باشد');
            this.fileInput = '';
          }else {
            this.data.file = fileBrowser.files[0];
          }


        }else if (this.data.updateObj.TypeName === 'Text') {
          if (this.sizeFile > this.data.updateObj.FileSize) {
            alert( 'بیشتر باشد' + this.data.updateObj.FileSize + ' سایز فایل انتخاب شده نباید بیشتر از ');
          }
          if ( DocExtention.indexOf(ext) === -1) {
            alert('فایل انتخاب شده باید متن باشد');
            this.fileInput = '';
          }else {
            this.data.file = fileBrowser.files[0];
          }
        }
      }else {
      this.checkEx(event);
      }
    }
  }
