import {Component, OnInit} from "@angular/core";

import {BackEndService} from '../../services/back-end-service';

@Component({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage implements OnInit {
  
  myItem: any;
  myToken: string;
  myError: any;
  myResponse: any;
  
  constructor(private backEndService: BackEndService) {
  }
  
  testAuth() {
    this.backEndService
        .goToAuthUrl()
        .then(res => this.myResponse = res)
        .catch(error => this.myError = JSON.stringify(error));
  }
  
  saveThisItem() {
    this.backEndService
        .saveItem(this.myItem)
        .then(res => this.myResponse = res)
        .catch(error => this.myError = JSON.stringify(error));
  }
  
  ngOnInit() {
    this.myItem = {
      title: '',
      content: '',
      lat: 0,
      long: 0
    };
  }
  
  /*constructor() {
    this.myUrl = 'Hello';
  }*/

}
