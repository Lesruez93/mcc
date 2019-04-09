import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyActZqNOcyIqMQkXe1VwZRHgXUywjdj_RY';

  constructor(public http: HttpClient) { }

  getPlaylistsForChannel(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
      .map(res => {
        return res['items'];
  })}

  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
      .map(res => {
        return res['items'];
      })
  }
}
