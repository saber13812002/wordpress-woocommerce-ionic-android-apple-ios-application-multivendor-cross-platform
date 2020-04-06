import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Data } from '../data';
import { Settings } from '../data/settings';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage {
    constructor(public api: ApiService, public data: Data, public loadingController: LoadingController, public navCtrl: NavController, public router: Router, public settings: Settings, public route: ActivatedRoute) {}
    getProducts(id) {
        console.log(this.router.url);
        this.navCtrl.navigateForward('/tabs/categories/products/' + id);
    }
    subCategories(id){
	  return this.data.categories.filter(item => item.parent == id);
	}
  	showSubCategory(i){
	  	let intial = this.data.mainCategories[i].show;
	  	this.data.mainCategories.forEach(item => item.show = false);
	  	this.data.mainCategories[i].show = !intial;
  	}
}