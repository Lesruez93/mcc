import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {CameraProvider} from "../../providers/camera/camera";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    private dp: string;
    private userinfo: any = {};

  constructor(public navCtrl: NavController,
              private sqlstorage:Storage,
              private actionsheetCtrl:ActionSheetController,
              private cameraProvider:CameraProvider,
              public platform: Platform,
              private loadingCtrl:LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.sqlstorage.get('user').then(res=>{
        //getting user Info from saved database
      this.userinfo = res
    }).catch()
    console.log('ionViewDidLoad ProfilePage');
  }


    changePicture() {
                //uploading a profile Picture

        const actionsheet = this.actionsheetCtrl.create({

            title: 'upload picture',
            buttons: [
                {
                    text: 'camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: () => {
                        this.takePicture();
                    }
                },
                {
                    text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
                    icon: !this.platform.is('ios') ? 'image' : null,
                    handler: () => {
                        this.getPicture();
                    }
                },
                {
                    text: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    role: 'destructive',
                    handler: () => {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    }

    takePicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(picture => {
            if (picture) {
                this.dp = picture;
                this.sqlstorage.set('prof_pic',this.dp);
            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

    getPicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
            if (picture) {
                this.dp = picture;

            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

}
