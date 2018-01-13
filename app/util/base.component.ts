import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './constants';
import { HttpService } from './decomService.component';

@Component ({})
export class BaseComponent {

 public jansuRed1 = '#881017' ;
 public jansuRed2 = '#AE1017' ;
 public jansuRed3 = '#C2161D' ;
 public jansuRed4 = '#E91B30' ;
 public imageUrl = 'http://192.168.1.25:8750/Service/getFile/';

 constructor(public router: Router , public httpService: HttpService) {
  this.configWindow();
  }

  private configWindow() {
    console.log(window.screen.deviceXDPI);
    if (this.isMobile()) {
      const viewportmeta = document.querySelector('meta[name="viewport"]');
      if (viewportmeta) {
          viewportmeta.textContent = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0 , user-scalable=0';
          document.body.addEventListener('gesturestart', function () {
              viewportmeta.textContent = 'width=device-width, minimum-scale=1, maximum-scale=1 , user-scalable=0';
          }, false);
      }
   }
  }


  public dir(): string {
       return  (Constants.currentlanguage !== null) ? Constants.currentlanguage.Direction : 'rtl' ;
  }

  public float(): string {
    if (Constants.currentlanguage !== null) {
       return (Constants.currentlanguage.Direction === 'ltr') ? 'left' : 'right' ;
    }
    return 'right';
  }

  public unfloat(): string {
    if (Constants.currentlanguage !== null) {
       return (Constants.currentlanguage.Direction !== 'ltr') ? 'left' : 'right' ;
    }
    return 'left';
  }

  public isMobile(): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(window.navigator.userAgent)) {
      return true;
    }
    return false;
  }
}
