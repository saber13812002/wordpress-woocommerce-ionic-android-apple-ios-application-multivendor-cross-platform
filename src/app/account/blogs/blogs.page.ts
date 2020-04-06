import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Post } from './../../data/post';
import { Settings } from './../../data/settings';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.page.html',
    styleUrls: ['./blogs.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogsPage implements OnInit {
    posts: any = {};
    filter: any = {};
    results: any = {};
    hasMoreItems: boolean = true;
    constructor(public api: ApiService, public router: Router, public post: Post, public settings: Settings, public navCtrl: NavController) {
        this.filter.page = 1;
    }
    ngOnInit() {
        this.getPosts();
    }
    async getPosts() {
        await this.api.getPosts('/api/core/get_recent_posts/?page=' + this.filter.page).subscribe(res => {
            if(res)
            this.posts = res;
            else this.posts.posts = [];
        }, err => {
            console.log(err);
        });
    }
    async loadData(event) {
        this.filter.page = this.filter.page + 1;
        await this.api.getPosts('/api/core/get_recent_posts/?page=' + this.filter.page).subscribe(res => {
            this.results = res;
            this.posts.posts.push.apply(this.posts.posts, this.results.posts);
            event.target.complete();
            if (this.results.posts.length == 0) this.hasMoreItems = false;
        }, err => {
            event.target.complete();
        });
    }
    getDetail(post) {
        this.post.post.post = post;
        this.navCtrl.navigateForward('/tabs/account/blogs/blog/' + post.id);
    }
}