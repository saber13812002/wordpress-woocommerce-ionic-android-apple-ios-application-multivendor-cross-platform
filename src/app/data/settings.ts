import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class Settings implements OnInit {
    //vendor
    vendor: boolean = false;

    //ADDONS
    addons: any;

    // REWARD POINTS
    user: any;
    rewardValue: any;
    reward: any;

    //all
    lan: any = {};
    languages: any = [];
    pages: any = [];
    customer: any = {};
    currency: any = ' ریال ';
    theme: any = {};
    wishlist: any = [];
    colWidthLatest: any = 6;
    colWidthProducts: any = 6;
    colWidthSearch: any = 6;
    homeGridViewHeight: 100;
    productsGridViewHeight: 100;
    productViewImageHeight: 100;
    scrollProductHeight: 100;
    widthMultipy: any = 1;
    width: any;
    status: any;
    mode: any = 'ios';
    dir: any = 'rtl';
    dimensions: any = {
        imageHeight: 100,
        productSliderWidth: 42,
        latestPerRow: 2,
        productsPerRow: 2,
        searchPerRow: 2,
        productBorderRadius: 0,
        productPadding: 0,
        suCatBorderRadius: 0
    };
    settings: any = {};

    constructor(
        public translate: TranslateService,
        public api: ApiService,
        public toastController: ToastController
    ) {
        this.customer.billing = {};
        this.customer.shipping = {};
        this.theme.tabBar = 'white';
        this.theme.header = 'white';
        this.theme.button = 'custom2';
    }

    ngOnInit() { }

    async addToWishlist(id) {
        if (this.customer.id) {
            this.wishlist[id] = true;
            await this.api.postItem('add_wishlist', {
                product_id: id
            }).subscribe(res => {
                this.wishlist = [];
                for (let item in res) {
                    this.wishlist[res[item].id] = res[item].id;
                }
            }, err => {
                console.log(err);
            });
        } else {
            this.presentToast(this.lan.login);
        }
    }

    async presentToast(message) {
        this.translate.get('Please login to add items to the wishlist').subscribe(translations => {
            this.lan.login = translations;
        });
        const toast = await this.toastController.create({
            message: this.lan.login,
            duration: 2000
        });
        toast.present();
    }

    async removeFromWishlist(id) {
        this.wishlist[id] = false;
        if (this.customer.id) {
            await this.api.postItem('remove_wishlist', {
                product_id: id
            }).subscribe(res => {
                this.wishlist = [];
                for (let item in res) {
                    this.wishlist[res[item].id] = res[item].id;
                }
            }, err => {
                console.log(err);
            });
        }
    }
    
    calc(width) {
        this.width = width;
        if (width >= 1025) {
            this.colWidthLatest = 12 / 5;
            this.colWidthProducts = 12 / 5;
            this.colWidthSearch = 12 / 5;
            this.dimensions.homeGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 10)) / 5);
            this.dimensions.productsGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 10)) / 5);
            this.dimensions.searchGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 10)) / 5);
            this.dimensions.productSliderWidth = width * 0.20;
            this.dimensions.homeSliderWidth = width * 0.20;
            this.dimensions.homeSliderHeight = this.dimensions.homeSliderWidth * this.dimensions.imageHeight / 100;
            this.widthMultipy = 0.4;
        }
        else if (width >= 769) {
            this.colWidthLatest = 12 / 4;
            this.colWidthProducts = 12 / 4;
            this.colWidthSearch = 12 / 4;
            this.dimensions.homeGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 8)) / 4);
            this.dimensions.productsGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 8)) / 4);
            this.dimensions.searchGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 8)) / 4);
            this.dimensions.productSliderWidth = width * 0.25;
            this.dimensions.homeSliderWidth = width * 0.25;
            this.dimensions.homeSliderHeight = this.dimensions.homeSliderWidth * this.dimensions.imageHeight / 100;
            this.widthMultipy = 0.5;
        }
        else if (width >= 481) {
            this.colWidthLatest = 12 / 3;
            this.colWidthProducts = 12 / 3;
            this.colWidthSearch = 12 / 3;
            this.dimensions.homeGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 6)) / 3);
            this.dimensions.productsGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 6)) / 3);
            this.dimensions.searchGridViewHeight = this.dimensions.imageHeight / 100 * ((width - (this.dimensions.productPadding * 6)) / 3);
            this.dimensions.productSliderWidth = width * 0.35;
            this.dimensions.homeSliderWidth = width * 0.35;
            this.dimensions.homeSliderHeight = this.dimensions.homeSliderWidth * this.dimensions.imageHeight / 100;
            this.widthMultipy = 0.7;
        } else {
            this.colWidthLatest = 12 / this.dimensions.latestPerRow;
            this.colWidthProducts = 12 / this.dimensions.productsPerRow;
            this.colWidthSearch = 12 / this.dimensions.searchPerRow;
            this.dimensions.homeGridViewHeight = (this.dimensions.imageHeight / 100) * (width - (this.dimensions.latestPerRow * this.dimensions.productPadding * 2)) / this.dimensions.latestPerRow;
            this.dimensions.productsGridViewHeight = (this.dimensions.imageHeight / 100) * (width - (this.dimensions.productPadding * this.dimensions.latestPerRow * 2)) / this.dimensions.productsPerRow;
            this.dimensions.searchGridViewHeight = (this.dimensions.imageHeight / 100) * (width - (this.dimensions.productPadding * this.dimensions.latestPerRow * 2)) / this.dimensions.searchPerRow;
            this.dimensions.productSliderWidth = width * 0.40;
            this.dimensions.homeSliderWidth = width * 0.40;
            this.dimensions.homeSliderHeight = this.dimensions.homeSliderWidth * this.dimensions.imageHeight / 100;
            this.dimensions.homeGridViewWidth = width - (this.dimensions.latestPerRow * this.dimensions.productPadding * 2) / this.dimensions.latestPerRow;
        }
    }
}