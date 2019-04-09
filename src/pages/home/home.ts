import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',


})
export class HomePage {


  constructor(public navCtrl: NavController,
              public modalCtrl:ModalController,

  ) {

  }

  pay() {

      let md = this.modalCtrl.create('PayPage');
      md.present()


  }

  gotoFaults(){
      this.navCtrl.push('FaultsPage')
  }

}