import {Component, ViewEncapsulation} from '@angular/core';
import {
    Alert,
    AlertController,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    ToastController,
    ViewController
} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {Observable} from "rxjs-compat";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";



interface Reg {
    name:string,

    uid:string,
    phone:string,
   role:string,
}

@Component({
  selector: 'page-about',
  templateUrl: 'complete.html',
  encapsulation: ViewEncapsulation.None
})
export class ModalComplete {

  name = '';
  address = '';
  surname = '';
  uid = '';
  phone = '';



    users: Observable<Reg[]>;
    usersCollectionRef: AngularFirestoreCollection<Reg>;

    model: any = {};
    private fullname: string;
    private location: any;
    private meter: any;
    private role: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private alertCtrl:AlertController,
    private loading:LoadingController,
    private toastCtrl: ToastController,
    private  navCtrl: NavController,
    private afs: AngularFirestore,


  ) {


      this.uid = params.get('uid');
      this.phone = params.get('phone');

          this.usersCollectionRef = this.afs.collection("admin");





  }

async save(){
    const loader = this.loading.create({
        content: "Please Wait",
        duration:10000
    });
    loader.present();
      this.fullname = this.name +" "+ this.surname;

    let postData = {

        name: this.fullname,
        first_name:this.name,
        last_name:this.surname,
        uid: this.uid,
        phone: this.phone|| 'Null',
        role:this.role,
    }

    this.usersCollectionRef.add(postData)
        .then(() => {

            //posting Data to Firebase database
            this.storage.set('adminuser',postData);

            console.log(postData);
            this.goToHome();
            loader.dismissAll();
            this.presentToast();
            this.dismiss();
        }).catch((error: any) => {
        console.log(error);
        loader.dismissAll();
        this.dismiss();
    });
    
    

        }





    presentAlert(er) {
        let alert: Alert = this.alertCtrl.create({
            title: er,

            buttons: ['Dismiss']
        });
        alert.present();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Hooray Thank you for registering !',
            duration: 3000,
            position: 'top'

        });

        toast.present();
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToHome(){
      this.storage.set('login', 'true');
      this.storage.set('name',this.fullname);
      this.navCtrl.push('FaultsPage',

          {
              uid:this.uid,
              //bid: this.branch_id,
              refresh:'true',

      },{
              direction: "forward",
              animate:true,

          }


      )
  }}





