import { Component, OnInit } from '@angular/core';
import { Settings } from './../../../data/settings';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from './../../../data/vendor';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(public alertController: AlertController, public vendor: Vendor, public settings: Settings, public loadingController: LoadingController, public navCtrl: NavController, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  	console.log(this.vendor.product);
  }

  next(){
    if(this.validateForm()){
      this.navCtrl.navigateForward('/tabs/account/add-products/details/' + this.vendor.product.categories[0] + '/photos');
    }
  }

  validateForm(){
    if(this.vendor.product.name == '' || this.vendor.product.name == undefined){
      this.presentAlert('Please enter name');
      return false;
    }

    if(this.vendor.product.type == '' || this.vendor.product.type == undefined){
      this.presentAlert('Please select product type');
      return false;
    }

    if(this.vendor.product.regular_price == '' || this.vendor.product.regular_price == undefined){
      this.presentAlert('Please enter regular price');
      return false;
    }

    else return true;
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
