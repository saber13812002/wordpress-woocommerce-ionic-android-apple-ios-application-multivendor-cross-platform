import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vendor } from './../../data/vendor';

@Component({
  selector: 'app-vendor-info',
  templateUrl: './vendor-info.page.html',
  styleUrls: ['./vendor-info.page.scss'],
})
export class VendorInfoPage implements OnInit {

  constructor(public vendor: Vendor) { }

  ngOnInit() {
  }
  OnDestroy() {
    this.vendor.vendor = {};
	}	

}
