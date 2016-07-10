import {Component, OnInit} from "@angular/core";
import {Nav} from 'ionic-angular';
import {GettingStartedPage} from '../../pages/getting-started/getting-started';

import {BackEndService} from '../../services/back-end-service';

@Component({
  templateUrl: 'build/pages/log-in/log-in.html'
})
export class LogInPage implements OnInit {
  
  loginUser: any;
  myError: any;
  myResponse: any;
  myNav: any;
  
  constructor(private backEndService: BackEndService, private thisNav: Nav) {
    this.myNav = thisNav;
  }
  
  
  loginThisUser() {
    this.backEndService
        .loginTheUser(this.loginUser)
        .then(res => {
            this.myNav.setRoot(GettingStartedPage);
          })
        .catch(error => this.myError = error);

  }
  
  openFacebook() {
    this.backEndService.facebookSignUp(this.loginUser.username, this.loginUser.password);
  }
  
  ngOnInit() {
    this.loginUser = {
      name: '',
      password: ''
    };
    
    this.backEndService
        .getBackEndToken()
        .catch(error => this.myError = error);
  }
  
}
