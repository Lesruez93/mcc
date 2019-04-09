import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs-compat";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import * as moment from "moment";
import {AngularFireAuth} from "angularfire2/auth";
import {FcmProvider} from "../../../providers/fcm/fcm";
import {Api} from "../../../providers/api/api";
import {Storage} from "@ionic/storage";


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

  constructor(navParams: NavParams,
              private navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              private fcm: FcmProvider,

              private churchname: Api,
              private sqlstorage: Storage,


  ) {
    this.item = navParams.get('data') || "lil";
    this.pId = this.item.docid;
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
