import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';
import { EmojiPickerComponentModule } from "../../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../../providers/emoji";
import {MomentModule} from "ngx-moment";

@NgModule({
  declarations: [
    Chat,
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(Chat),
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
