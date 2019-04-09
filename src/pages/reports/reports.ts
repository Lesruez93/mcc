import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs-compat";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

interface Faults {
    docid: string;
    title: string,
    message: string,
    time: number | string;
}
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})

export class ReportsPage {
    faults: Observable<Faults[]>;
    faultsRef: AngularFirestoreCollection<Faults>;
    private ftype: any = 'Resolved';
    assigned: boolean = false;

  constructor(public navCtrl: NavController,
              private afs:AngularFirestore,
              public navParams: NavParams) {
      this.loadData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }
    captureScreen()
    {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('Zesa-fault-reporting.pdf'); // Generated PDF
        });
    }
    loadData(){
      if (this.ftype == 'Assigned'){
          this.assigned = true
      }
        this.faultsRef = this.afs.
        collection("faults",ref => ref
            .where('status','==',this.ftype));
        //this.faults = this.faultsRef.valueChanges();
        this.faults = this.faultsRef.snapshotChanges().map
        (changes => {
            return changes.map(
                a => {
                    const data = a.payload.doc.data() as Faults;
                    data.docid = a.payload.doc.id;
                    return data
                }
            )
        }) ;
    }
}
