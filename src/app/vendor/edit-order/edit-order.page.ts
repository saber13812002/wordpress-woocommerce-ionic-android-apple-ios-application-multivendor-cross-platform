import { Component, OnInit } from '@angular/core';
import { Settings } from './../../data/settings';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {

	id: any;
  orders: any;
  disableButton: boolean = false;
    
  constructor(public api: ApiService, public settings: Settings, public route: ActivatedRoute, public loadingController: LoadingController, public navCtrl: NavController) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
        this.getOrder();
  }

  async getOrder() {
        const loading = await this.loadingController.create({
            message: '...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
        await this.api.getItem('orders/' + this.id).subscribe(res => {
            this.orders = res;
            loading.dismiss();
        }, err => {
            console.log(err);
            loading.dismiss();
        });
    }

    save(){
        console.log(this.orders);
        this.disableButton = true;

        this.api.put('orders/' + this.id, this.orders).subscribe(res => {
            this.disableButton = false;
            this.navCtrl.navigateBack('/tabs/account/vendor-orders');
        }, err => {
            console.log(err);
            this.disableButton = false;
        });
    }
}
