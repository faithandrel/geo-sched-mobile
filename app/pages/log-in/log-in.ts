import {Component, OnInit} from "@angular/core";
import {Nav} from 'ionic-angular';
import {GettingStartedPage} from '../../pages/getting-started/getting-started';

import {BackEndService} from '../../services/back-end-service';
import {SchdErrorHandler} from '../../services/schd-error-handler';
import {SchdLocation} from '../../services/schd-location';

@Component({
  templateUrl: 'build/pages/log-in/log-in.html'
})
export class LogInPage implements OnInit {
  
  loginUser: any;
  myError: any;
  myResponse: any;
  myNav: any;
  
  constructor(private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation,
              private thisNav: Nav) {
    this.myNav = thisNav;
  }
  
  
  loginThisUser() {
    this.backEndService
        .loginTheUser(this.loginUser)
        .then(res => {
            this.myNav.setRoot(GettingStartedPage);
          })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error, this.myNav);
        });

  }
  
  openFacebook() {
    this.backEndService.facebookSignUp(this.loginUser.username, this.loginUser.password);
  }
  
  toastTest() {
    this.schdLocation.toastGeo(this.myNav);
  }
  
  ngOnInit() {
    this.loginUser = {
      name: '',
      password: ''
    };
    
    this.backEndService
        .getBackEndToken()
        .catch(error => {
            this.schdErrorHandler.showSchdError(error, this.myNav);
        });
    
    this.schdErrorHandler.checkWeb(this.myNav);
    
    this.schdLocation.checkGeo(this.myNav);
    
    //this.schdLocation.monitorGeo(this.myNav);
  }
  
}
