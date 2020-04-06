import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    form: any;
    errors: any;
    status: any = {};
    disableSubmit: boolean = false;
    pushForm: any = {};
    googleStatus: any = {};
    faceBookStatus: any = {};
    googleLogingInn: boolean = false;
    facebookLogingInn: boolean = false;
    phoneLogingInn: boolean = false;
    userInfo: any;
    phoneVerificationError: any;
    constructor(public platform: Platform, private oneSignal: OneSignal, public api: ApiService, public settings: Settings, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, private fb: FormBuilder/*, private googlePlus: GooglePlus, private facebook: Facebook*/) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }
    ngOnInit() {}
    async onSubmit() {
        this.disableSubmit = true;
        await this.api.postItem('login', this.form.value).subscribe(res => {
            this.status = res;
            if (this.status.errors) {
                this.errors = this.status.errors;
                for (var key in this.errors) {
                    console.log(key);
                    this.errors[key].forEach(item => item.replace('<strong>ERROR<\/strong>:', ''));
                }
            } else if (this.status.data) {
                this.settings.customer.id = this.status.ID;
                 if (this.platform.is('cordova')){
                    this.oneSignal.getIds().then((data: any) => {
                        this.form.onesignal_user_id = data.userId;
                        this.form.onesignal_push_token = data.pushToken;
                    });
                   this.api.postItem('update_user_notification', this.form).subscribe(res =>{});
                 }

                if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                    this.settings.vendor = true;
                }
                this.navCtrl.navigateBack('/tabs/account');
            }
            this.disableSubmit = false;
        }, err => {
            this.disableSubmit = false;
        });
    }
    forgotton() {
        this.navCtrl.navigateForward('/tabs/account/login/forgotten');
    }
    /*googleLogin(){
        this.googleLogingInn = true;
        this.googlePlus.login({})
        .then(res => {
            this.googleStatus = res;
            this.api.postItem('google_login', {
                    "access_token": this.googleStatus.userId,
                    "email": this.googleStatus.email,
                    "first_name": this.googleStatus.givenName,
                    "last_name": this.googleStatus.familyName,
                    "display_name": this.googleStatus.displayName,
                    "image": this.googleStatus.imageUrl
                }).subscribe(res => {
                this.status = res;
                if (this.status.errors) {
                    this.errors = this.status.errors;
                } else if (this.status.data) {
                    this.settings.customer.id = this.status.ID;
                     if (this.platform.is('cordova')){
                        this.oneSignal.getIds().then((data: any) => {
                            this.form.onesignal_user_id = data.userId;
                            this.form.onesignal_push_token = data.pushToken;
                        });
                       this.api.postItem('update_user_notification', this.form).subscribe(res =>{});
                     }
                    if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                        this.settings.vendor = true;
                    }
                    this.navCtrl.navigateBack('/tabs/account');
                }
                this.googleLogingInn = false;
            }, err => {
                this.googleLogingInn = false;
            });
            this.googleLogingInn = false;
        })
        .catch(err => {
            this.googleStatus = err;
            this.googleLogingInn = false;
        });
    }
    facebookLogin(){
        this.facebookLogingInn = true;
        this.facebook.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
            this.faceBookStatus = res;
            this.api.postItem('facebook_login', {
                    "access_token": this.faceBookStatus.authResponse.accessToken,
                }).subscribe(res => {
                this.status = res;
                if (this.status.errors) {
                    this.errors = this.status.errors;
                } else if (this.status.data) {
                    this.settings.customer.id = this.status.ID;
                     if (this.platform.is('cordova')){
                        this.oneSignal.getIds().then((data: any) => {
                            this.form.onesignal_user_id = data.userId;
                            this.form.onesignal_push_token = data.pushToken;
                        });
                       this.api.postItem('update_user_notification', this.form).subscribe(res =>{});
                     }
                    if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                        this.settings.vendor = true;
                    }
                    this.navCtrl.navigateBack('/tabs/account');
                }
                this.facebookLogingInn = false;
            }, err => {
                this.facebookLogingInn = false;
            });
            this.facebookLogingInn = false;
        })
        .catch(e => {
            this.faceBookStatus = e;
            this.facebookLogingInn = false;
        });
    }
    loginWithPhone(){
        this.phoneLogingInn = true;
        (<any>window).AccountKitPlugin.loginWithPhoneNumber({
            useAccessToken: true,
            defaultCountryCode: "IN",
            facebookNotificationsEnabled: true,
          }, data => {
          (<any>window).AccountKitPlugin.getAccount(
            info => this.handlePhoneLogin(info),
            err => this.handlePhoneLogin(err));
          });
    }
    handlePhoneLogin(info){
        if(info.phoneNumber) {
            this.api.postItem('phone_number_login', {
                    "phone": info.phoneNumber,
                }).subscribe(res => {
                this.status = res;
                if (this.status.errors) {
                    this.errors = this.status.errors;
                } else if (this.status.data) {
                    this.settings.customer.id = this.status.ID;
                     if (this.platform.is('cordova')){
                        this.oneSignal.getIds().then((data: any) => {
                            this.form.onesignal_user_id = data.userId;
                            this.form.onesignal_push_token = data.pushToken;
                        });
                       this.api.postItem('update_user_notification', this.form).subscribe(res =>{});
                     }
                    if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                        this.settings.vendor = true;
                    }
                    this.navCtrl.navigateBack('/tabs/account');
                }
                this.phoneLogingInn = false;
            }, err => {
                this.phoneLogingInn = false;
            });
        } else this.phoneLogingInn = false;
    }
    handlePhoneLoginError(error){
        this.phoneVerificationError = error;
        this.phoneLogingInn = false;
    } */
}