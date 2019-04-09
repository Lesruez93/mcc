import {Component} from "@angular/core";
import {LoadingController, NavController, NavParams, Platform, ViewController} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs-compat";
import * as moment from "moment";
import {Api} from "../../providers/api/api";
import {Storage} from "@ionic/storage";

interface Faults {
    docid: string;
  id: string;
  title: string,
  message: string,
  pid: number

}


@Component({
  selector: 'prayer-page',
  templateUrl: 'modalcontent.html'
})
export class ModalContentPage {

        private db: any;
        model: any = {};
  private dtt = moment().format('YYYY-MM-DD HH:mm');
  pid = Date.now();


        private messages: any;
        faults: Observable<Faults[]>;
        orgRef: AngularFirestoreCollection<Faults>;
    private uid: string;
    private title: any;
    private message: string;

    private username: any;
    private location: any;
    private id: any;
    private data: any;
        constructor(
        public platform: Platform,
        private org: Api,
        private navCtrl: NavController,
      public params: NavParams,
        public viewCtrl: ViewController,
        public loading:LoadingController,
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        private sqlstorage:Storage

) {

            this.id = this.params.get('id');
                this.data = this.params.get('data');
            console.log(JSON.stringify(this.data));

            this.checkAuth()
            this.loadData()

            this.sqlstorage.get('name').then((val) => {
                this.username = val

            });



        }

  async loadData(){
      this.orgRef = this.afs.collection("faults");
      this.faults = this.orgRef.snapshotChanges().map
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

   async checkAuth () {
            //Checking if the the user is authentication
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.uid = res.uid

            } });
    }
 async saveData() {


                let content: any = {
                    title: this.data.title,

                    id:this.pid,
                    date: this.dtt,
                    location:this.data.location,
                    message: this.data.message,

                }
                const loader = this.loading.create({
                    content: "Please wait...",
                    duration: 10000,
                });
                loader.present();
                console.log(JSON.stringify(content));
                loader.dismissAll();
                this.dismiss();


                this.orgRef.doc(this.id).update(content)
                    .then(() => {

                        //posting Data to Firebase database
                        console.log(JSON.stringify(content))
                        loader.dismissAll();
                        this.dismiss();
                    }).catch((error: any) => {
                    console.log(error);
                    loader.dismissAll();
                    this.dismiss();
                });
            }



  dismiss() {
    this.viewCtrl.dismiss();
    // dismissing the modal
  }
}