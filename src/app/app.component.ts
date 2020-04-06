import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { PassService } from './services/pass.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.scss']
})
export class AppComponent {

    subscription: Subscription;
    messages: any[] = [];
    loaded: boolean = false;

    constructor(
        private nativeStorage: NativeStorage,
        public translateService: TranslateService,
        public platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private appMinimize: AppMinimize,
        private fcm: FCM,
        private router: Router,
        public passService: PassService,
    ) {
        this.initializeApp();

        this.subscription = this.passService.getMessage().subscribe(message => {
            console.log(message)

            if (message) {
                this.messages.push(message);
                this.loaded = (message.text == 'loaded' ? true : false);

            } else {
                this.messages = [];
            }
        });

    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();

            /* Add your translation file in src/assets/i18n/ and set your default language here */
            this.translateService.setDefaultLang('ar');
            document.documentElement.setAttribute('dir', 'rtl');

            //this.statusBar.backgroundColorByHexString('#004a91');
            this.statusBar.backgroundColorByHexString('#cccccc');
            this.statusBar.styleBlackTranslucent();
            this.statusBar.styleLightContent();
            //this.statusBar.backgroundColorByHexString('#cccccc');
            //this.statusBar.styleLightContent();

            //this.minimize();
            //this.platform.registerBackButtonAction(() => {
            // this.appMinimize.minimize();
            //});

            //document.documentElement.setAttribute('dir', 'rtl');

            this.fcmInit();
        });
    }

    fcmInit() {
        this.fcm.getToken().then(token => {
            console.log(token);
            localStorage.setItem('fcmToken', token)
        });
        //   Add this function to refresh the FCM token.

        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
            localStorage.setItem('fcmToken', token)
        });
        //   Add this function to receive a push notification from Firebase Cloud Messaging (FCM).

        this.fcm.onNotification().subscribe(data => {
            console.log(data);
            if (data.wasTapped) {
                console.log('Received in background');
                this.router.navigate([data.landing_page, data.id]);
            } else {
                console.log('Received in foreground');
                this.router.navigate([data.landing_page, data.id]);
            }
        });
    }
}