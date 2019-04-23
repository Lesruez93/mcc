import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {EmojiProvider} from '../providers/emoji';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NativeStorage} from '@ionic-native/native-storage';
import {Items} from '../mocks/providers/items';
import {Api, Settings} from '../providers';
import {MyApp} from './app.component';
import {CallNumber} from "@ionic-native/call-number";
import {BrowserTab} from "@ionic-native/browser-tab";
import {HTTP} from "@ionic-native/http";
import {Firebase} from "@ionic-native/firebase";

import * as firebase from "firebase";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {FcmProvider} from "../providers/fcm/fcm";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ModalContentPage} from "../pages/faults/modal-content-page.component";
import {Geolocation} from "@ionic-native/geolocation";
import { CameraProvider } from '../providers/camera/camera';


const config = {
  apiKey: "AIzaSyCUJ1n1KTJHDaDdVmpY686z8AAle8GAbQQ",
  authDomain: "dship-6fc02.firebaseapp.com",
  databaseURL: "https://dship-6fc02.firebaseio.com",
  projectId: "dship-6fc02",
  storageBucket: "dship-6fc02.appspot.com",
  messagingSenderId: "107565011509"
};
firebase.initializeApp(config);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
      ModalContentPage



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name: '__bcc',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      ModalContentPage


  ],
  providers: [
            Api,

            Firebase,
            AngularFireModule,
            Items,
            Camera,
            NativeStorage,
            StatusBar,
            InAppBrowser,
            EmojiProvider,
            CallNumber,
            BrowserTab,
            HTTP,
             Geolocation,
            FcmProvider,





      { provide: Settings, useFactory: provideSettings, deps: [Storage] },


// Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CameraProvider,
  ]
})
export class AppModule { }
