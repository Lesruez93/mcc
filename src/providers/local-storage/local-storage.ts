import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class LocalStorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello LocalStorageProvider Provider');
  }

  get(key: string) {
    return this.storage.get( key );
  }

}
