import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CheckoutData {
	form: any = {};
	billingStates: any = {};
	shippingStates: any = {};
	orderReview: any = {};
	constructor(){
		//this.orderReview.payment = {};
	}
}