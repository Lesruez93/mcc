import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';


@Injectable()
export class Api {
  url: string = 'https://ifc.disciplesoft.co.za/api';
  churchname: string = "BCC";
  fullChurchName: string = "Borrowdale Community Church";
    headers = {
        'Content-Type': 'application/json'
    };


    constructor(  private HTTP: HTTP) {
    }

    get(endpoint: string, params?: any, reqOpts?: any) {

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        let cacheKey = this.url + '/' + endpoint ;
        // let request =  this.http.get(this.url + '/' + endpoint, reqOpts);

        return  this.HTTP.get(this.url + '/' + endpoint, {}, {});

        // return this.cache.loadFromObservable(cacheKey, request);
    }

    post(endpoint: string, body: any, reqOpts?: any , headers?: string)
    {
        return this.HTTP.post(this.url + '/' + endpoint, body, headers);
    }

   put(endpoint: string, body: any, reqOpts? :any,headers? : string){

        return this.HTTP.put(this.url+'/'+ endpoint, body,headers)
   }

    patch(endpoint: string, body: any, reqOpts?: any,headers?: string) {
        return this.HTTP.patch(this.url + '/' + endpoint, body, headers);
    }


}

