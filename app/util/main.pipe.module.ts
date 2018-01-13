import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { TranslatePipe } from '../translate/translate.pipe';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
// import { TranslateService } from '../translate/translate.service';
import * as moment from 'jalali-moment';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'localizedDateEN',
  pure: false
})
export class LocalizedDateENPipe implements PipeTransform {

  constructor() {}

  transform(value: any, pattern: string = 'yyyy/MM/dd'): any {
    const datePipe: DatePipe = new DatePipe('en');
    return datePipe.transform(value, pattern);
  }
}

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Pipe({
  name: 'localizedDateFA',
  pure: false
})
export class LocalizedDateFAPipe implements PipeTransform {

  transform(value: any, pattern: string = 'yyyy/MM/dd'): any {
    const datePipe: DatePipe = new DatePipe('fa');
    return datePipe.transform(value, pattern);
  }
}


@Pipe({
  name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string) : string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const MomentDate = moment(value);
    return MomentDate.format('jYYYY/jM/jD h:mm');
  }
}
// @Pipe({
//   name: 'localizedCurrency',
//   pure: false
// })
// export class CurrencyLocalePipe implements PipeTransform {

//   constructor(private translateService: TranslateService) {}

//   transform(value: any, pattern: string): any {
//     const c  = new DecimalPipe('en');
//     return c.transform(value, '3.0');
//   }

// }

@NgModule({
  declarations: [LocalizedDateENPipe , LocalizedDateFAPipe, SafeHtmlPipe, TruncatePipe, JalaliPipe ],
  imports: [CommonModule],
  exports: [LocalizedDateENPipe , LocalizedDateFAPipe, SafeHtmlPipe, TruncatePipe, JalaliPipe ]
})


export class MainPipe {}
