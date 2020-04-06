import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Settings } from './../data/settings';
import { ApiService } from './../api.service';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Config } from './../config';


@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss']
})
export class AccountPage {
    constructor(private config: Config, public api: ApiService, public navCtrl: NavController, public settings: Settings, public platform: Platform, private appRate: AppRate, private emailComposer: EmailComposer, private socialSharing: SocialSharing) {}
    ngOnInit() {
    }
    goTo(path) {
        this.navCtrl.navigateForward(path);

    }
    async log_out() {
        this.settings.customer.id = undefined;
        this.settings.vendor = false;
        this.settings.wishlist = [];
        await this.api.postItem('logout').subscribe(res => {}, err => {
            console.log(err);
        });
        (<any>window).AccountKitPlugin.logout();
    }
    rateApp() {
        if (this.platform.is('cordova')) {
            this.appRate.preferences.storeAppURL = {
                ios: this.settings.settings.rate_app_ios_id,
                android: this.settings.settings.rate_app_android_id,
                windows: 'ms-windows-store://review/?ProductId=' + this.settings.settings.rate_app_windows_id
            };
            this.appRate.promptForRating(true);
        }
    }
    shareApp() {
        if (this.platform.is('cordova')) {
            var url = '';
            if (this.platform.is('android')) url = this.settings.settings.share_app_android_link;
            else url = this.settings.settings.share_app_ios_link;
            var options = {
                message: '',
                subject: '',
                files: ['', ''],
                url: url,
                chooserTitle: ''
            }
            this.socialSharing.shareWithOptions(options);
        }
    }
    email(contact) {
        let email = {
            to: contact,
            attachments: [],
            subject: '',
            body: '',
            isHtml: true
        };
        this.emailComposer.open(email);
    }
}