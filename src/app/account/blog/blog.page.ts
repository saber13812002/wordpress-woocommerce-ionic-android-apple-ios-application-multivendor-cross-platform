import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Post } from './../../data/post';
import { Settings } from './../../data/settings';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.page.html',
    styleUrls: ['./blog.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogPage implements OnInit {
    id: any;
    constructor(public api: ApiService, public router: Router, public post: Post, public settings: Settings, public route: ActivatedRoute) {}
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getPost();
    }
    async getPost() {
        await this.api.getPosts('/api/core/get_post/?id=' + this.id).subscribe(res => {
            this.post.post = res;
        }, err => {
            console.log(err);
        });
    }
    OnDestroy() {
        this.post.post.post = {};
    }
}