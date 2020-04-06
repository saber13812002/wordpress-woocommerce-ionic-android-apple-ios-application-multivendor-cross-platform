import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../api.service';
import { Data } from './../../../data';
import { Vendor } from './../../../data/vendor';
import { Settings } from './../../../data/settings';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage {

	items: any = {};
	subcategories: any = [];
	categories: any = [];

    constructor(public vendor: Vendor, public api: ApiService, public data: Data, public loadingController: LoadingController, public navCtrl: NavController, public router: Router, public settings: Settings, public route: ActivatedRoute) {}
    getCategory(ID, slug, name){
    	this.subcategories = [];
        this.vendor.product.categories[0] = {id: ID};     
        this.items.id = ID;
        this.items.name = name;
        this.items.slug = slug;
        this.items.categories = this.data.categories;

        for(let item in this.items.categories){
            if(this.items.categories[item].parent == ID){
                this.subcategories.push(this.items.categories[item]);
            }
        }

        if(this.subcategories.length){
           this.navCtrl.navigateForward('/tabs/account/add-products/subcategory/' + ID);
        }

        else this.navCtrl.navigateForward('/tabs/account/add-products/details/' + ID);
    }
}
