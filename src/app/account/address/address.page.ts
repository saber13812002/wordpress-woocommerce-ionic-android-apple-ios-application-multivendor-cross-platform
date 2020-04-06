import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';

@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
    constructor(public api: ApiService, public settings: Settings, public router: Router, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute) {}
    ngOnInit() {
        this.getCustomer();
    }
    async getCustomer() {
        const loading = await this.loadingController.create({
            message: '...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
        await this.api.getItem('customers/' + this.settings.customer.id).subscribe(res => {
            this.settings.customer = res;
            loading.dismiss();
        }, err => {
            console.log(err);
            loading.dismiss();
        });
    }
    editAddress() {
        this.navCtrl.navigateForward('/tabs/account/address/edit-address');
    }
}