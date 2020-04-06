import { Component } from '@angular/core';
import { Config } from '../../config';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Settings } from './../../data/settings';
import { HomePage} from '../../home/home.page';
import { Config as IonicConfig } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  constructor(
    //public home: HomePage, 
    public ionicConfig: IonicConfig, 
    public router: Router, 
    public settings: Settings, 
    public navCtrl: NavController, 
    public translateService: TranslateService, 
    public nativeStorage: NativeStorage, 
    public config: Config) 
    { 
// this.applyLanguage();
    }

    applyLanguage(){
      this.translateService.setDefaultLang(this.config.lang);
      if(this.config.lang == 'ar'){
        this.settings.dir = 'rtl';
      } else this.settings.dir = 'ltr';
      this.translateService.get(['Back']).subscribe(translations => {
            this.ionicConfig.set('backButtonText', translations['Back']);
      });
      document.documentElement.setAttribute('dir', this.settings.dir);
      this.nativeStorage.setItem('settings', {lang: this.config.lang, dir: this.settings.dir})
        .then(
          () => console.log(),
          error => console.error(error)
      );
      //this.home.getBlocks();
      this.navCtrl.pop();
    }


}
