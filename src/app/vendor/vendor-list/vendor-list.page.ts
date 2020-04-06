import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { Vendor } from './../../data/vendor';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage implements OnInit {
    vendors: any = [];
    filter: any = {};
    hasMoreItems: boolean = true;
    tempVendor: any = [];
    constructor(public api: ApiService, public settings: Settings, public router: Router, public navCtrl: NavController, public route: ActivatedRoute, public vendor: Vendor) {
      this.filter.page = 1;
      this.filter.per_page = 30;
      this.filter.wc_vendor = true;
    }

    ngOnInit() {
        this.getWCFMVendors();
    }
    async getWcVendors() {
        await this.api.WCMPVendor('vendors', this.filter).subscribe(res => {
            this.vendors = res;
        }, err => {
            console.log(err);
        });
    }
    async loadData(event) {
        this.filter.page = this.filter.page + 1;
        
        await this.api.postItem('wcfm-vendor-list', this.filter).subscribe(res => {
            this.tempVendor = res;
            this.vendors.push.apply(this.vendors, res);
            event.target.complete();
            if (this.tempVendor && this.tempVendor.length == 0) this.hasMoreItems = false;
            else if (!this.tempVendor || !this.tempVendor.length) event.target.complete();
        }, err => {
            event.target.complete();
        });


    }
    async getDokanVendors() {
        await this.api.postItem('vendors-list', this.filter).subscribe(res => {
            this.vendors = res;
        }, err => {
            console.log(err);
        });
    }
    async getWCFMVendors() {
        await this.api.postItem('wcfm-vendor-list', this.filter).subscribe(res => {
            this.vendors = res;
        }, err => {
            console.log(err);
        });
    }
    getDetail(item) {
        this.vendor.vendor = item;
        this.navCtrl.navigateForward('/tabs/vendor/products');
    }

}
