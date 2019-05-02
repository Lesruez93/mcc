import {Component} from '@angular/core';
import {
    ActionSheetController, Alert, AlertController,
    IonicPage,
    LoadingController,
    MenuController,
    ModalController,
    NavController, NavParams
} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs-compat";
import * as moment from "moment"
import {Api} from "../../providers/api/api";
import {ModalContentPage} from "./modal-content-page.component";
import {Geolocation} from "@ionic-native/geolocation";

interface Faults {
  docid: string;
  title: string,
  message: string,
  time: number | string;
}

@IonicPage()

@Component({
  selector: 'faults-page',

  templateUrl: 'template.html'

})
export class FaultsPage {
  messages: any;
  private db: any;
  model: any = {};
  isEditing: boolean = false;
 faults: Observable<Faults[]>;
  faultsRef: AngularFirestoreCollection<Faults>;

   private dtt = moment().format('YYYY-MM-DD HH:m:s');
    private uid: any;
    private ftype: any ;
    private lat: number;
    private lon: number;

  constructor(public navCtrl: NavController,
              public loading:LoadingController,
              public modalCtrl: ModalController,
              public afAuth: AngularFireAuth,
             private menu:MenuController,
             public afs: AngularFirestore,
              public geolocation:Geolocation,

              private churchname: Api,
              private actionSheet:ActionSheetController,
              private alertCtrl:AlertController,
              private navParams:NavParams


)

  {
         this.loadCoord()
            this.loadData();

          }
          load(){
      if (this.ftype == 'all'){
          this.loadData()
      }
      else {
          this.faultsRef = this.afs.collection("faults", ref =>
              ref
                  .where('location', '==', this.ftype)

                  .orderBy("id", "desc",));
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
          });
      }
          }


    loadData(){
        this.faultsRef = this.afs.
        collection("faults",ref =>
            ref
               // .where('type','==',this.ftype)

                .orderBy("id","desc",));
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


    checkAuth () {
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.uid = res.uid
            } else {
                this.navCtrl.setRoot('login',{
                    refresh:"true",
                });
            }
        });
    }

    async  loadCoord()
    {

        await  this.geolocation.getCurrentPosition().then(res=>{
            this.lat= res.coords.latitude;
            this.lon = res.coords.longitude;
            console.log("sjjsjs",this.lon);
        }).catch(e=>{
            console.log(e);
        })
    }




  goToFaults(prayerId) {
      this.navCtrl.push('Chat', {

          data: prayerId,



      }

      );
      console.log(prayerId)
  }

      presentAction(id) {
          const actionSheet = this.actionSheet.create({
              title: 'Action',
              buttons: [
                  {
                      text: 'Assign',

                      handler: () => {
                         // this.openModal(id)
                      }
                  },{
                      text: 'View or Reply',
                      handler: () => {
                          this.goToFaults(id)

                      }
                  },
                  {
                      text: 'Resolved',
                      handler: () => {
                          this.resolved(id)

                      }
                  }
                  ,
                  {
                      text: 'Edit',
                      handler: () => {
                          this.edit(id)

                      }
                  },
                  {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                          console.log('Cancel clicked');
                      }
                  }
              ]
          });
          actionSheet.present();
      }


    private resolved(id: any) {
      if (id.status == "Pending")
      {
          let alertt: Alert = this.alertCtrl.create({
              title: 'Resolve a pending unassigned issue ? ',

              buttons: [{
                  text: 'Cancel',
                  role: 'cancel',

              },
                  {
                      text:'Okay',handler: data =>{
                          let updateData ={
                              'status':'Resolved',
                              'to':'Resolved without being assigned by Admin'
                          }
                          const fault = this.afs.collection("faults").doc(id.docid);
                          fault.update(updateData)

                      }
                  }],

          });
          alertt.present();
      }else {
          let updateData ={
              'status':'Resolved',

          }
          const fault = this.afs.collection("faults").doc(id.docid);
          fault.update(updateData)

      }


}


    private edit(id: any) {
        let modal = this.modalCtrl.create(ModalContentPage,{
            id:id.docid,
            data:id
        });
        modal.present();
    }


    addFault(){
        let modal = this.modalCtrl.create(ModalContentPage,{
          lat:this.lat,
            lon:this.lon
        });
        modal.present();
    }

}


