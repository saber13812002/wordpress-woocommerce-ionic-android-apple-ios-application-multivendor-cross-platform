import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { Data } from './../../data';
import { Settings } from './../../data/settings';
import { Product } from './../../data/product';
import { FilterPage } from './../../filter/filter.page';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage {
    products: any;
    tempProducts: any = [];
    subCategories: any = [];
    filter: any = {};
    attributes: any;
    hasMoreItems: boolean = true;
    loader: boolean = false;
    constructor(public alertController: AlertController, public modalController: ModalController, public api: ApiService, public data: Data, public product: Product, public settings: Settings, public router: Router, public navCtrl: NavController, public route: ActivatedRoute) {
        this.filter.page = 1;
        this.filter.vendor = this.settings.customer.id; 
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
        console.log(data);
        if (data) {
            console.log('Found Data');
            this.filter = data;
            this.filter.page = 1;
            this.getProducts();
        }
    }
    async loadData(event) {
        this.filter.page = this.filter.page + 1;
        await this.api.getItem('products', this.filter).subscribe(res => {
            this.tempProducts = res;
            this.products.push.apply(this.products, this.tempProducts);
            event.target.complete();
            if (this.tempProducts.length == 0) this.hasMoreItems = false;
        }, err => {
            event.target.complete();
        });
        console.log('Done');
    }
    async getProducts() {
        this.loader = true;
        await this.api.getItem('products', this.filter).subscribe(res => {
            this.products = res;
            this.loader = false;
        }, err => {
            console.log(err);
        });
    }
    async getAttributes() {
        await this.api.postItem('product-attributes', {
            category: this.filter.category
        }).subscribe(res => {
            this.attributes = res;
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        this.filter.category = this.route.snapshot.paramMap.get('id');
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
        this.navCtrl.navigateForward(this.router.url + '/view-product/' + product.id);
    }
    getCategory(id) {
        var endIndex = this.router.url.lastIndexOf('/');
        var path = this.router.url.substring(0, endIndex);
        this.navCtrl.navigateForward(path + '/' + id);
    }
    editProduct(product){
        this.product.product = product;
        this.navCtrl.navigateForward(this.router.url + '/edit-product/' + product.id);
    }

    async delete(product){
        const alert = await this.alertController.create({
          header: 'Delete',
          message: 'Are you sure you want to delete this product?',

          buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.api.deleteItem('products', product.id).subscribe(res => {
                this.getProducts();
            }, err => {
                console.log(err);
            });
         }
        }]

        });

        await alert.present();
    }
}