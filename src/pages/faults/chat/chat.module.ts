import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';
import { EmojiPickerComponentModule } from "../../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../../providers/emoji";
import {MomentModule} from "ngx-moment";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    Chat,
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(Chat),
      AgmCoreModule.forRoot({
          // please get your own API key here:
          // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
          apiKey: 'AIzaSyCUJ1n1KTJHDaDdVmpY686z8AAle8GAbQQ',
          libraries: ['places', 'drawing', 'geometry'],
      }),
      MomentModule,

  ],
  exports: [
    Chat
  ],
  providers: [
    EmojiProvider
  ]
})
export class ChatModule {
}
