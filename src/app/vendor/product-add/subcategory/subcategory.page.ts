import { Component, OnInit } from '@angular/core';
import { Settings } from './../../../data/settings';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from './../../../data';
import { Vendor } from './../../../data/vendor';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {

	id: any;
	subCategories: any = [];

  constructor(public vendor: Vendor, public data: Data, public settings: Settings, public loadingController: LoadingController, public navCtrl: NavController, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

  	for (var i = 0; i < this.data.categories.length; i++) {
        if (this.data.categories[i].parent == this.id) {
            this.subCategories.push(this.data.categories[i]);
        }
    }
  }

   getCategory(ID) {
         this.vendor.product.categories[0] = {id: ID};     
         this.navCtrl.navigateForward('/tabs/account/add-products/details/' + ID);
    }  

}
