import { Component } from '@angular/core';
import { Data } from '../data';
import { Settings } from '../data/settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	constructor(public data: Data, public settings: Settings){
	}
}
