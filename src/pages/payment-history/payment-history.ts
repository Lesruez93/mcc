import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs-compat";

interface Payments {
    docid: string;
    user:any
    number:any
    amount:any
}

/**
 * Generated class for the PaymentHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
})
export class PaymentHistoryPage {
    paymentsRef: AngularFirestoreCollection<Payments>;
    private payments: Observable<Payments[]>;


    constructor(public navCtrl: NavController,
                public afs: AngularFirestore,

                public navParams: NavParams) {
        this.loadData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentHistoryPage');
  }


    loadData(){
        this.paymentsRef = this.afs.
        collection("payments",ref =>
            ref
            //.where('type','==',this.ftype)

                .orderBy("id","desc",));
        //this.faults = this.faultsRef.valueChanges();
        this.payments = this.paymentsRef.snapshotChanges().map
        (changes => {
            return changes.map(
                a => {
                    const data = a.payload.doc.data() as Payments;
                    data.docid = a.payload.doc.id;
                    return data
                }
            )
        }) ;
    }


}
