import {Injectable} from '@angular/core';

import {Api} from '..';

@Injectable()
export class VideosProvider {
constructor(public api: Api) { }


  query(string: any) {
    return this.api.get('playlist/' + string);
  }



}
