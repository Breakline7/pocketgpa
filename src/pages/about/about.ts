﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

    constructor(public admob: AdMobFree, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  showBanner() {

      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: true
          //id: Your Ad Unit ID goes here
      };

      this.admob.banner.config(bannerConfig);

      this.admob.banner.prepare().then(() => {
          // success
      }).catch(e => console.log(e));

  }
}