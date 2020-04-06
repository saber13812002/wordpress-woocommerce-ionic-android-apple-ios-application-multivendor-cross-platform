import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Data } from './../../data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
	show: boolean = false;
	amount: any;
  cart: any;
  wallet: any = {};
  constructor(public loadingController: LoadingController, public router: Router, public route: ActivatedRoute, public navCtrl: NavController, public data: Data, public api: ApiService, public settings: Settings, public alertController: AlertController) { }

  ngOnInit() {
      this.getWallet();
  }
  async getWallet() {
      await this.api.postItem('wallet').subscribe(res => {
          this.wallet = res;
          console.log(res);
      }, err => {
          console.log(err);
      });
  }
  showField() {
      this.show = !this.show;
  }
  async addTopup() {
      if (this.validateForm()) {
          const loading = await this.loadingController.create({
              message: 'Please wait...',
              translucent: true,
              cssClass: 'custom-class custom-loading'
          });
          await loading.present();
          await this.api.ajaxCall('/wp-admin/admin-ajax.php', {
              woo_wallet_balance_to_add: this.amount,
              woo_wallet_topup: this.wallet.woo_wallet_topup,
              _wp_http_referer: '/my-account/woo-wallet/add/',
              woo_add_to_wallet: 'Add'
          }).subscribe(res => {
              this.api.postItem('cart').subscribe(res => {
                  this.cart = res;
                  this.data.updateCart(this.cart.cart_contents);
                  this.show = false;
                  loading.dismiss();
                  this.navCtrl.navigateForward(this.router.url + '/cart');
              }, err => {
                  console.log(err);
                  loading.dismiss();
              });
          }, err => {
              console.log(err);
              loading.dismiss();
          });
      }
  }
  validateForm() {
      if (this.amount == undefined || this.amount == "") {
          this.presentAlert('Please enter Amount');
          return false
      } else {
          return true
      }
  }
  async presentAlert(alertMessage) {
      const alert = await this.alertController.create({
          header: 'Oops!',
          message: alertMessage,
          buttons: ['OK']
      });
      await alert.present();
  }

}
