import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs-compat";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import * as moment from "moment";
import {AngularFireAuth} from "angularfire2/auth";
import {FcmProvider} from "../../../providers/fcm/fcm";
import {Api} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";


interface Reply {
  docid: string;
  title: string,
  message: string,
  time: number | string;
  messageId: string;
  userId: string;
  userName: string;

  userAvatar: string;
  toUserId: string;


  status: string;
}
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;


  id: string;
  name?: string;
  avatar?: string;
    zoom: number = 15;

    messages: any;
  model: any = {};
  editorMsg = '';showEmojiPicker = false;
  private item: any;
  reply: Observable<Reply[]>;
  replyCollectionRef: AngularFirestoreCollection<Reply>;
  private dtt = moment().format('YYYY-MM-DD HH:mm');
  pId: string;
  private pid = Date.now();
    private uid: string;
    private userinfo: any = {};
    private dp: any;
    private username: any;
    private isHidden: boolean = false;
    private link: string;
    private currentLat: number;
    private currentLon: number;
    private nav: string;

  constructor(navParams: NavParams,
              private navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              private fcm: FcmProvider,

              private churchname: Api,
              private sqlstorage: Storage,
              public navigator: Geolocation


  ) {
    this.item = navParams.get('data') || "lil";
      this.pId = this.item.docid;

      // this.link = "https://www.google.com/maps/@"+this.item.lat+","+this.item.lon+",15z?hl=en-US";

    this.navigator.getCurrentPosition().then(resp=>{
        this.currentLat = resp.coords.latitude;
        this.currentLon = resp.coords.longitude;
        this.nav = "https://www.google.com/maps/dir/"+this.currentLat+","+this.currentLon+"/"+this.item.lat
            +","+this.item.lon+"/"+"@"+this.currentLat+","+this.currentLon +
            ",9z/data=!3m1!4b1!4m9!4m8!1m3!2m2!1d30.995142!2d-17.8055188!1m3!2m2!1d31.99519!2d-18.805512";

    }).catch(e=>{
        console.log(e)
    });

   // console.log("idddddd"+this.pId);

      this.loadData()
      this.sqlstorage.get('prof_pic').then((val) => {
          this.dp = val

      });

      this.sqlstorage.get('name').then((val) => {
          this.username = val

      });


  }


  
  async loadData(){
      this.replyCollectionRef = this.afs.collection("faults").doc(this.pId)
          .collection("replies" ,ref => ref.orderBy("id","asc"));
      this.reply = this.replyCollectionRef.snapshotChanges().map
      (changes => {
          return changes.map(
              a => {
                  const data = a.payload.doc.data() as Reply;
                  data.docid = a.payload.doc.id;

                  return data
              }
          )
      });
      this.fcm.subscribeToTopic(this.pid).catch(err=>{

      });

  }
  addocument(model: any) {

    console.log(model);

    this.replyCollectionRef.add(model)
      .then(()=>
      {
          this.fcm.subscribeToTopic(this.pId).catch(err=>{
              console.log(JSON.stringify(err))

          });


      }).catch((error: any) => {
      console.log(error);

    });

  }


  ionViewWillLeave() {
    // unsubscribe
  }

  ionViewDidEnter() {
    //get notice list




  }






onFocus() {
   // this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }


  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock notice
    const id = Date.now().toString();

    this.editorMsg = '';



  }



  

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

    loc() {
        this.isHidden=true
    }
}
