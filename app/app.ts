import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {LogInPage} from './pages/log-in/log-in';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {DisplayMapPage} from './pages/display-map/display-map';

import {Splashscreen} from 'ionic-native';

import {BackEndService} from './services/back-end-service';
import {SchdErrorHandler} from './services/schd-error-handler';
import {SchdLocation} from './services/schd-location';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    BackEndService,
    SchdErrorHandler,
    SchdLocation
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LogInPage;
  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation) {
    this.initializeApp();
    
    if (backEndService.isLoggedIn()) {
      this.rootPage = GettingStartedPage;
    }
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Map', component: DisplayMapPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      Splashscreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.schdLocation.monitorGeo();
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
