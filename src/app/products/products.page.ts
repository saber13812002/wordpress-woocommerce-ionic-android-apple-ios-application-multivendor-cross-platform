import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController  } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Data } from '../data';
import { Settings } from '../data/settings';
import { Product } from '../data/product';
import { FilterPage } from '../filter/filter.page';
import { Vendor } from '../data/vendor';

@Component({
    selector: 'app-products',
    templateUrl: 'products.page.html',
    styleUrls: ['products.page.scss']
})
export class ProductsPage {
    products: any = [];
    tempProducts: any = [];
    subCategories: any = [];
    filter: any = {};
    attributes: any;
    hasMoreItems: boolean = true;
    loader: boolean = false;
    searchInput: any;
    showSearch: boolean = true;
    constructor(public vendor: Vendor, public modalController: ModalController, public api: ApiService, public data: Data, public product: Product, public settings: Settings, public router: Router, public navCtrl: NavController, public route: ActivatedRoute) {
        this.filter.page = 1;
        this.filter.status = 'publish';
    }
    async getFilter() {
        const modal = await this.modalController.create({
            component: FilterPage,
            componentProps: {
                filter: this.filter,
                attributes: this.attributes
            }
        });
        modal.present();
        const {
            data
        } = await modal.onDidDismiss();
        if (data) {
            this.filter = data;
            this.filter.page = 1;
            this.getProducts();
        }
    }
    loadData(event) {
        this.filter.page = this.filter.page + 1;
        this.api.getItem('products', this.filter).subscribe(res => {
            this.tempProducts = res;
            this.products.push.apply(this.products, this.tempProducts);
            event.target.complete();
            if (this.tempProducts.length == 0) this.hasMoreItems = false;
        }, err => {
            event.target.complete();
        });
        console.log('Done');
    }
    getProducts() {
        this.loader = true;
        this.api.getItem('products', this.filter).subscribe(res => {
            this.products = res;
            this.loader = false;
        }, err => {
            console.log(err);
        });
    }
    getAttributes() {
        this.api.postItem('product-attributes', {
            category: this.filter.category
        }).subscribe(res => {
            this.attributes = res;
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        if(this.route.snapshot.paramMap.get('id')){
            this.filter.category = this.route.snapshot.paramMap.get('id');
        }
        if(this.vendor.vendor){
            this.filter.vendor = this.vendor.vendor.id ? this.vendor.vendor.id : this.vendor.vendor.ID;
        }

        if (this.data.categories && this.data.categories.length) {
            for (var i = 0; i < this.data.categories.length; i++) {
                if (this.data.categories[i].parent == this.filter.category) {
                    this.subCategories.push(this.data.categories[i]);
                }
            }
        }
        if (this.settings.colWidthProducts == 4) this.filter.per_page = 15;
        this.getProducts();
        this.getAttributes();
    }
    getProduct(product) {
        this.product.product = product;
        this.navCtrl.navigateForward(this.router.url + '/product/' + product.id);
    }
    getCategory(id) {
        var endIndex = this.router.url.lastIndexOf('/');
        var path = this.router.url.substring(0, endIndex);
        this.navCtrl.navigateForward(path + '/' + id);
    }
    loaded(product){
        console.log('Loaded');
        product.loaded = true;
    }
    onInput(){
        if (this.searchInput.length) {
            this.products = '';
            this.filter.search = this.searchInput;
            this.filter.page = 1;
            this.getProducts();
        } else {
            this.products = '';
            this.filter.search = undefined;
            this.filter.page = 1;
            this.getProducts();
        }
    }
    ionViewWillLeave(){
        this.showSearch = false;
    }
    ionViewDidLeave() {
        this.vendor.vendor = {};
        this.showSearch = true;
    }
}