import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.page.html',
    styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
    address: any = [];
    countries: any;
    states: any;
    billingStates: any;
    shippingStates: any;
    status: any;
    disableButton: boolean = false;
    constructor(public api: ApiService, public settings: Settings, public router: Router, public navCtrl: NavController, public route: ActivatedRoute) {}
    ngOnInit() {
        this.getCountries();
    }
    async getCountries() {
        await this.api.getItem('settings/general/woocommerce_specific_allowed_countries').subscribe(res => {
            this.countries = res;
            this.getStates();
        }, err => {
            console.log(err);
        });
    }
    async getStates() {
        await this.api.postItem('get-states').subscribe(res => {
            this.states = res;
            this.getBillingRegion();
            this.getShippingRegion();
        }, err => {
            console.log(err);
        });
    }
    processAddress() {
        for (var key in this.settings.customer.billing) {
            this.address['billing_' + key] = this.settings.customer.billing[key];
        }
        for (var key in this.settings.customer.shipping) {
            this.address['shipping_' + key] = this.settings.customer.shipping[key];
        }
        this.updateAddress();
    }
    async updateAddress() {
        this.disableButton = true;
        await this.api.postItem('update-address', this.address).subscribe(res => {
            this.status = res;
           // this.navCtrl.pop();
            this.disableButton = false;
        }, err => {
            this.disableButton = false;
        });
    }
    getBillingRegion() {
        if (this.states[this.settings.customer.billing.country] && 0 !== this.states[this.settings.customer.billing.country].length) this.billingStates = this.states[this.settings.customer.billing.country];
        else this.billingStates = undefined;
    }
    getShippingRegion() {
        if (this.states[this.settings.customer.shipping.country] && 0 !== this.states[this.settings.customer.shipping.country].length) this.shippingStates = this.states[this.settings.customer.shipping.country];
        else this.shippingStates = undefined;
    }
}