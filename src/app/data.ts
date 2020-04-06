import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Data {
	categories: any = [];
	mainCategories: any = [];
	blocks: any = [];
	cart: any = {};
	count: number = 0;
	cartItem: any;
	wishlistId: any = [];
	cartNonce: any;
    freaturedProducts: any = [];
    onsaleProducts: any = [];
    products: any = [];

	constructor() {}

	updateCart(cart_contents) {
     this.cartItem = cart_contents;
     this.cart = [];
     this.count = 0;
     for (let item in cart_contents) {
        this.cart[cart_contents[item].product_id] = parseInt(cart_contents[item].quantity);
        this.count += parseInt(cart_contents[item].quantity);
     }
   }
}

