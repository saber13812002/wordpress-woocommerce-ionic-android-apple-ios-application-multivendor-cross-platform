import { Component, OnInit } from '@angular/core';
import { Settings } from '../data/settings';
import { ApiService } from '../api.service';
import { Product } from '../data/product';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(public settings: Settings, public api: ApiService, public productData: Product) { }
  form: any = {};
  status: any = {};
  disableButton: boolean = false;
  contactUsLink: any = '';
  ngOnInit() {
  }

  submit(){
  	this.disableButton = true;
  	this.form['your-name'] = this.form.yourName;
  	this.form['your-email'] = this.form.yourEmail;
  	this.form['your-tel'] = this.form.yourTel;

	this.api.ajaxCall(this.contactUsLink, this.form).subscribe(res => {
		this.disableButton = false;
        this.status = res;
    }, err => {
        console.log(err);
    });

  }

}
