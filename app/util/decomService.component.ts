import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions , Headers } from '@angular/http';
import { Message } from '../model/message';
import { AppComponent } from '../app.component';
import { ServerError } from '../util/enums';
import { Constants } from './constants';

@Injectable()
export class HttpService {

  private _emitter = new EventEmitter<Bundle>();

  private url = 'http://192.168.1.25:8750/Service/action';
  private options: RequestOptions;

  constructor(private http: Http) {
    this.options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'})});
  }

  public requset(assemblyName: string , typeName: string ,
     methodName: string , params: string[] , response: (error: ServerError , msg: Message) => void) {
    // if (Constants.user) {
      const m  = new Message();
      m.SessionID = '4' ; // Constants.user.SesionID;
      m.AssemblyName = assemblyName;
      m.TypeName   = typeName;
      m.MethodName = methodName;
      m.Parameters = JSON.stringify(params);
      this.http.post(this.url , m , this.options)
      // .map((res: Response) => res.json())
      .subscribe(
          value => {
            try {
            response(ServerError.None, value.json());
            } catch (e) {
              console.log(value); // TODO
              response(ServerError.ErrorConnection , null) ;
            }
          },
          erorr => {
            console.log(erorr);
            response(ServerError.ErrorConnection , null) ;
          });
    //  } else {
    //   response(ServerError.NotLogIn , null) ;
    //  }
  }

  public emitBundle(bundle: Bundle) {
    this._emitter.emit(bundle);
  }

  public get emitter() {
    return this._emitter;
  }
}

export class Bundle {
  constructor(public url: string , public data: any ) {}
}
