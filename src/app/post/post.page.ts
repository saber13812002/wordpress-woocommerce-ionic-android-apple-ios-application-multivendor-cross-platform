import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Settings } from '../data/settings';

@Component({
    selector: 'app-post',
    templateUrl: 'post.page.html',
    styleUrls: ['post.page.scss']
})
export class PostPage {
    post: any;
    id: any;
    constructor(public api: ApiService, public router: Router, public navCtrl: NavController, public settings: Settings, public route: ActivatedRoute) {}
    async getPost() {
        await this.api.postItem('page_content', {
            page_id: this.id
        }).subscribe(res => {
            this.post = res;
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getPost();
    }
}