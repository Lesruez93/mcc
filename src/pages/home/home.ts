import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',


})
export class HomePage {
    private lon: number;
    private lat: number;
    private error: any;


  constructor(public navCtrl: NavController,
              public modalCtrl:ModalController,

  ) {



  }
  ionViewDidLoad(){
  }

  // pay() {
  //
  //     let md = this.modalCtrl.create('PaymentHistoryPage');
  //     md.present()
  //
  //
  // }

  gotoFaults(){
      this.navCtrl.push('FaultsPage',{
          lat:this.lat,
          lon:this.lon
      })
  }



}