import {Component, ViewChild,} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, MenuController, ModalController, Nav, Platform, ToastController} from 'ionic-angular';
import {FcmProvider} from "../providers/fcm/fcm";
import {Home, Login, Tabs} from "../pages";
import {Storage} from "@ionic/storage";
import {AngularFireAuth} from 'angularfire2/auth';
import {Api} from "../providers";


@Component({
  templateUrl:'app.html'
})
export class MyApp {
    rootPage = Home;
    private logged: any;
    //private uid: any;

    @ViewChild(Nav) nav: Nav;
    private uid: any;


    pages: any[] = [
        {title: 'Home', component: 'AboutTabsPage', icon: 'ios-home-outline'},
        {title: 'Devotions', component: 'DevotionsPage', icon: 'ios-contact-outline'},
        {title: 'Videos', component: 'LivestreamPage', icon: 'logo-youtube'},

        {title: 'Settings', icon: 'ios-settings-outline'}

    ];

    constructor(private translate: TranslateService, platform: Platform,
                private config: Config,
                private storage: Storage,
                private statusBar: StatusBar,
                private fcm: FcmProvider,
                private   toastCtrl: ToastController,
                private churchname: Api,
                private menu: MenuController,
                private afs: AngularFireAuth,
                private modalCtrl: ModalController,
    ) {


        platform.ready().then(() => {
            // this.menu.swipeEnable(false)

            // this.storage.get('login').then((val) => {
            //     this.logged = val;
            //     this.afs.authState.subscribe(res => {
            //
            //
            //         if (res && res.uid && this.logged == 'true') {
            //             this.rootPage = Home;
            //             this.uid = res.uid;
            //         }
            //         else {
            //             this.rootPage = Home
            //
            //         }
            //     })
            // })
            // //  func.sync()
            // Get a FCM token
            fcm.getToken()
            fcm.subscribeToTopic(this.churchname.churchname).catch(err => {

            });


            fcm.listenToNotifications()
                .subscribe(res => {

                    if (res.wasTapped) {
                        this.nav.setRoot(res.page, {pageId: res.title});

                    }
                    else {
                        const toast = toastCtrl.create({
                            message: res.body,
                            duration: 10000,
                            showCloseButton: true,
                            closeButtonText: 'View',
                            dismissOnPageChange: true,
                            position: 'top'


                        });
                        toast.present();

                        toast.onDidDismiss((data, role) => {
                            // console.log('Dismissed toast');
                            if (role == "close") {
                                this.nav.push(res.page, {pageId: res.title});


                            }
                        });
                    }
                })


        });
        statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#f2af37')
        this.initTranslate();


    }

    // onSplitPaneChange(e) {
    //     if (e._visible) {
    //         this.rootPage = Tabs
    //     } else {
    //         this.rootPage = Home
    //     }
    // }
    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();

        if (browserLang) {
            if (browserLang === 'zh') {
                const browserCultureLang = this.translate.getBrowserCultureLang();

                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            } else {
                this.translate.use(this.translate.getBrowserLang());
            }
        } else {
            this.translate.use('en'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    openPage(pageId) {

//       if (pageId.title == "Settings") {
//           let modal = this.modalCtrl.create(ModalOption);
//           modal.present();
//       }
//       this.nav.setRoot(pageId.component)
//
// }
    }
}
