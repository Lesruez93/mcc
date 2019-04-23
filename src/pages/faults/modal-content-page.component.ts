import {Component} from "@angular/core";
import {
    ActionSheetController,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    ViewController
} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs-compat";
import * as moment from "moment";
import {Api} from "../../providers/api/api";
import {Storage} from "@ionic/storage";
import {CameraProvider} from "../../providers/camera/camera";

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
    private lat: number;
    private lon: number;
    private dp: string;
    constructor(
        public platform: Platform,
        private actionsheetCtrl:ActionSheetController,
        private cameraProvider:CameraProvider,
        private loadingCtrl:LoadingController,
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
        this.lat = this.params.get('lat');
        this.lon= this.params.get('lon');
        console.log(this.lat+'  '+this.lon);

        //  this.checkAuth()
        this.loadData();

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

    async checkAuth ()
    {
        //Checking if the the user is authentication
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.uid = res.uid

            } });
    }
    async saveData() {
       //Adding a fault
        // the following data is posted to the Firebase DATABASE

        let content: any = {
            title: this.title,
            id:this.pid,
            date: this.dtt,
            dp:this.dp||null,
            location:this.location,
            status:'Pending',
            message: this.message,
            lat:this.lat,
            lon:this.lon,
            member:"Lester"

        };
        console.log(JSON.stringify(content));

        const loader = this.loading.create({
            content: "Please wait...",
            duration: 10000,
        });
        loader.present();
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



    dismiss() {
        this.viewCtrl.dismiss();
        // dismissing the modal
    }



    changePicture() {
        // Uploading a a picture

        const actionsheet = this.actionsheetCtrl.create({
            title: 'upload picture',
            buttons: [
                {
                    text: 'camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: () => {
                        this.takePicture();
                    }
                },
                {
                    text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
                    icon: !this.platform.is('ios') ? 'image' : null,
                    handler: () => {
                        this.getPicture();
                    }
                },
                {
                    text: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    role: 'destructive',
                    handler: () => {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    }

    takePicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(picture => {
            if (picture) {
                this.dp = picture;
            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

    getPicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
            if (picture) {
                this.dp = picture;

            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

}
