import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
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
    private account: any;

  constructor(public navCtrl: NavController,
              public afs: AngularFirestore,
              public viewCtrl:ViewController,

              public loading:LoadingController,
              public navParams: NavParams) {

      this.orgRef = this.afs.collection("payments");
  }

              ionViewDidLoad() {
                console.log('ionViewDidLoad PayPage');
                //Loading the Page
              }

                      pay(){
                        //Paynow sample code
              //payment Function for making the Payment
                          const Paynow = require("paynow");
                          let testIntegrationId = '4198';
                          let testIntegrationKey = '5c74798d-f9b0-42e0-9a61-a48138a7189c';
                          // let testIntegrationId = '7438';
                          // let testIntegrationKey = 'dff90f5-ccae-4803-8701-c5e83c6675b1';
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
                        //Function for addinf payment info to the database

                            let content: any = {
                                amount: this.amount,
                                id:this.pid,
                                date: this.dtt,
                                account:this.account,
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
      console.log('lslslslslslslsldclicked');
      //dismissing the modal
      this.viewCtrl.dismiss()

    }


}
