import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { md5 } from './md5';
import { Settings } from '../data/settings';

@Component({
    selector: 'app-review',
    templateUrl: './review.page.html',
    styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
    id: any;
    reviews: any;
    hasMoreItems: boolean = true;
    filter: any = {};
    constructor(public api: ApiService, public router: Router, public route: ActivatedRoute, public settings: Settings) {}
    ngOnInit() {
        this.filter.page = 1;
        this.id = this.route.snapshot.paramMap.get('id');
        this.filter.product = this.id;
        this.getReviews()
    }
    async loadData(event) {
        this.filter.page = this.filter.page + 1;
        await this.api.getReviews('products/'+this.id+'/reviews', this.filter).subscribe(res => {
            this.reviews.push.apply(res);
            event.target.complete();
            if (!res) this.hasMoreItems = false;
        }, err => {
            event.target.complete();
        });
        console.log('Done');
    }
    async getReviews() {
        await this.api.getReviews('products/'+this.id+'/reviews').subscribe(res => {
            this.reviews = res;
            console.log(this.reviews);
            for (let item in this.reviews) {
                this.reviews[item].avatar = md5(this.reviews[item].email);
            }
        }, err => {});
    }
}