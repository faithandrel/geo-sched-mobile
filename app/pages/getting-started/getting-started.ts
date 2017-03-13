import {Component, OnInit} from "@angular/core";
import {Nav} from 'ionic-angular';

import {BackEndService} from '../../services/back-end-service';
import {SchdLocation} from '../../services/schd-location';

@Component({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage implements OnInit {
  
  myItem: any;
  myToken: string;
  myError: any;
  myResponse: any;
  myNav: any;
  
  constructor(private backEndService: BackEndService,
              private schdLocation: SchdLocation,
              private thisNav: Nav) {
    this.myNav = thisNav;
  }
  
  saveThisItem() {
    this.schdLocation
        .getGeo()
        .then(res => {
            this.myItem.latitude = res.latitude;
            this.myItem.longitude = res.longitude;
            return this.backEndService.saveItem(this.myItem);
          })
        .then(res => this.myResponse = JSON.stringify(res))
        .catch(error => this.myError = JSON.stringify(error));
  }
  
  toastTest() {
    location.reload();
  }
  
  ngOnInit() {
    this.myItem = {
      title: '',
      content: '',
      latitude: 0,
      longitude: 0
    };
    
    //this.schdLocation.toastGeo(this.myNav);
  }
  
  /*constructor() {
    this.myUrl = 'Hello';
  }*/

}
