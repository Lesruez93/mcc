import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var require :any;


/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
    public data :any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  pay(){
      const Paynow = require("paynow");
      let testIntegrationId = '4198';
      let testIntegrationKey = '5c74798d-f9b0-42e0-9a61-a48138a7189c';
      let paynow = new Paynow(testIntegrationId, testIntegrationKey);


      paynow.resultUrl = "http://example.com/gateways/paynow/update";
      paynow.returnUrl = "http://example.com/return?gateway=paynow";
      let payment = paynow.createPayment("Invoice 007", "james@mailinator.com");
      payment.add("Laser Guided Missile", 11.99);

      paynow.sendMobile(payment,'0775658123','ecocash').then(response => {
          if (response.success) {
              let link = response.redirectUrl;
              console.log('Go to ' + link + ' to complete the transaction.');
              console.log(response.pollUrl)
          }
          else {
              console.log(response.error);
          }
      });

  }

}
