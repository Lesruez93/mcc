import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import * as moment from "moment";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
declare var require :any;


interface Payment {
}

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
    public data :any;
    private amount: number;
    pid = Date.now();

    private dtt = moment().format('YYYY-MM-DD HH:m:s');
    orgRef: AngularFirestoreCollection<Payment>;

    private number: any;
    private user: any = 'Lester';

  constructor(public navCtrl: NavController,
              public afs: AngularFirestore,

              public loading:LoadingController,
              public navParams: NavParams) {

      this.orgRef = this.afs.collection("faults");
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
      let payment = paynow.createPayment("Invoice 007", "lesterrusike@gmail.com");
      payment.add("Bii", this.amount);

      paynow.sendMobile(payment,this.number,'ecocash').then(response => {
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



    async makePayment() {


        let content: any = {
            amount: this.amount,
            id:this.pid,
            date: this.dtt,
            address:this.data.address,
            user: this.user,
            number: this.number

        };
        const loader = this.loading.create({
            content: "Please wait...",
            duration: 10000,
        });
        loader.present();
        console.log(JSON.stringify(content));
        loader.dismissAll();
        this.dismiss();


        this.orgRef.add(content)
            .then(() => {

                //posting Data to Firebase database
                loader.dismissAll();
                this.dismiss();
            }).catch((error: any) => {
            console.log(error);
            loader.dismissAll();
            this.dismiss();
        });
    }
    dismiss(){

    }


}
