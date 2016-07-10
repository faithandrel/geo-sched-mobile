import {Component, OnInit} from "@angular/core";

import {BackEndService} from '../../services/back-end-service';

@Component({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage implements OnInit {
  
  myUrl: string;
  myToken: string;
  myError: any;
  myUser: any;
  myResponse: any;
  
  constructor(private backEndService: BackEndService) {
  }
  
  getToken() {
    this.backEndService
        .getBackEndToken()
        .then(theToken => this.myToken = theToken)
        .catch(error => this.myError = error);
  }
  
  getJwt() {
    return this.backEndService.getJwtToken();
  }
  
  addThisUser() {
    this.backEndService
        .addNewUser(this.myUser.name)
        .then(res => this.myResponse = res)
        .catch(error => this.myError = error);
    console.log(this.myResponse);
    console.log(this.myError);
  }
  
  testAuth() {
    this.backEndService
        .goToAuthUrl()
        .then(res => this.myResponse = res)
        .catch(error => this.myError = JSON.stringify(error));
    console.log(this.myResponse);
    console.log(this.myError);
  }
  
  openFacebook() {
    this.backEndService.facebookSignUp(this.myUser.name, this.myUser.password);
  }
  
  ngOnInit() {
    this.myUrl = this.backEndService.getUrl();
    this.backEndService.getSavedJwt();
    this.getToken();
    this.myUser = {
      name: '',
      password: ''
    };
  }
  
  /*constructor() {
    this.myUrl = 'Hello';
  }*/

}
