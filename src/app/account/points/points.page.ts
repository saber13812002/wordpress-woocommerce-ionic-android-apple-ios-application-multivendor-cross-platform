import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Settings } from '../../data/settings';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
	points: any;
  constructor(public api: ApiService, public settings:Settings, public navCtrl: NavController) {
    this.points = {};
    this.points.items = [];
  }

  async ngOnInit() {
 	  await this.api.postItem('getPointsHistory').subscribe((res:any) => {
			  this.points = res;
        this.settings.reward = res.points;
        this.settings.rewardValue = res.points_vlaue; 		
 		});
  }
}
