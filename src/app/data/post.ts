import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Post {
	post: any = {};
	constructor(){
		this.post.post = {};
	}
}