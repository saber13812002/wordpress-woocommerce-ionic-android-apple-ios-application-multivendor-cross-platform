import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { Product } from './../../data/product';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.page.html',
    styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
    wishlist: any = [];
    constructor(public api: ApiService, public router: Router, public settings: Settings, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute, public productData: Product) {}
    ngOnInit() {
    }

    ionViewDidEnter() {
        if(this.settings.customer.id){
            this.getWishlist();
        }
    }
    async getWishlist() {
        await this.api.postItem('get_wishlist').subscribe(res => {
            this.wishlist = res;
        }, err => {
            console.log(err);
        });
    }
    async removeFromWishlist(id) {
        await this.api.postItem('remove_wishlist', {
            product_id: id
        }).subscribe(res => {
            this.wishlist = res;
        }, err => {
            console.log(err);
        });
    }
    getProduct(id){
        this.productData.product = {};
        this.navCtrl.navigateForward('/tabs/account/wishlist/product/' + id);
    }
}