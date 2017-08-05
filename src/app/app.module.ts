import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TipsPage } from '../pages/tips/tips';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CourseDetailPage } from '../pages/course-detail/course-detail';
import { AddCoursePage } from '../pages/add-course/add-course';
import { Data } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage/es2015';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CourseDetailPage,
    AddCoursePage,
    TipsPage,
    AboutPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CourseDetailPage,
      AddCoursePage,
      TipsPage,
      AboutPage,
      SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data
  ]
})
export class AppModule {}
