import { User } from '../model/user';
import { Language } from '../model/language';

export class Constants {

  public static userKey = 'UserJson';
  public static langKey = 'LangJson';
  public static user: User = null;
  public static languages: [Language]=
   [ { Name : 'فارسی', Code: 'fa' , Direction: 'rtl' } ,  { Name: 'English', Code: 'en' , Direction: 'ltr' }];
  public static currentlanguage = Constants.languages[0];

  static supportHtml5Storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false; // TODO
    }
  }

  static saveValue(key: string , value: string) {
     localStorage.setItem(key , value);
  }

  static getValue(key: string): string {
    return localStorage.getItem(key) ;
  }

 static removeValue(key: string ) {
  localStorage.removeItem(key);
 }

}
