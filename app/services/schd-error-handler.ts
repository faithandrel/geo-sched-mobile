import { Injectable } from '@angular/core';
import { Toast, Nav } from 'ionic-angular';
import { Network } from 'ionic-native';

@Injectable()
export class SchdErrorHandler {

  constructor() {
    
  }
  
  showSchdError(theError: any, nav: Nav) {
    let toast = Toast.create({
      message: JSON.stringify(theError),
      duration: 3000,
    });
    
    nav.present(toast);

  }
  
  checkWeb(nav: Nav) {
    if (Network.connection == 'none') {
      let toast = Toast.create({
        message: 'No connection.',
        //duration: 10000,
      });
      nav.present(toast);
    }
    
  }
  
}