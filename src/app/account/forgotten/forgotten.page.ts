import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-forgotten',
    templateUrl: './forgotten.page.html',
    styleUrls: ['./forgotten.page.scss'],
})
export class ForgottenPage implements OnInit {
    form: any;
    email: any;
    errors: any;
    status: any = {};
    disableSubmit: boolean = false;
    constructor(public api: ApiService, public loadingController: LoadingController, public navCtrl: NavController, public settings: Settings, private fb: FormBuilder) {
        this.email = this.fb.group({
            email: ['', Validators.email]
        });
        this.form = this.fb.group({
            otp: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', '']
        });
    }
    ngOnInit() {}
    async forgotten() {
        this.disableSubmit = true;
        await this.api.postItem('email-otp', this.email.value).subscribe(res => {
            this.status = res;
            this.form.patchValue({ email: this.email.value.email });
            console.log(this.form.value.email);
            this.disableSubmit = false;
        }, err => {
            this.disableSubmit = false;
        });
    }
    async resetPassword() {
        this.disableSubmit = true;
        await this.api.postItem('reset-user-password', this.form.value).subscribe(res => {
            this.status = res;
            //this.navCtrl.navigateBack('/tabs/account');
            this.disableSubmit = false;
        }, err => {
            this.disableSubmit = false;
        });
    }
}