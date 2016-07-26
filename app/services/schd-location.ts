import { Injectable } from '@angular/core';
import { Toast, Alert, Nav } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SchdLocation {
  
  locationStatus: any = false;
  myLocation: any = false;
  geoStream: any = false;
  
  constructor() {
     this.geoStream = Geolocation.watchPosition();
  }
  
  toastGeo(nav: Nav) {
    let myGeo = Geolocation.watchPosition();
    myGeo.subscribe(position => {
       let toast = Toast.create({
          message: 'Geo '+ JSON.stringify(position),
          duration: 3000,
        });
        this.myLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
        nav.present(toast);
    });
  }
  
  monitorGeo() {
    this.geoStream.subscribe(position => {
       let toast = Toast.create({
          message: 'Geo '+ JSON.stringify(position),
          duration: 3000,
        });
        this.myLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
    });
  }
  
  getGeo() {
    if (this.myLocation != false) {
      return Promise.resolve(this.myLocation);
    }
    else {
      return Promise.reject('Location not found.');
    }
    /*Geolocation.watchPosition().toPromise()
          .then(res => {
             let toast = Toast.create({
              message: 'Geo '+ JSON.stringify(res),
              duration: 3000,
            });
            
            nav.present(toast);
          });*/
  }
  
  checkGeo(nav: Nav) {
    let locInterval = Observable.interval(10000);
    let previousStatus = this.locationStatus;
    
    locInterval.subscribe(position => {
      Diagnostic.isLocationEnabled().then(res => {
            this.locationStatus = res;
            if (!res) {
              let toast = Toast.create({
                message: 'Please turn on your GPS.',
                duration: 3000,
              });
              
              nav.present(toast);
            }
            return this.getGeo();
        }).then(res => {
        },
        err => {
          if (this.locationStatus) {
              let alert = Alert.create({
               title: 'GPS',
               subTitle: 'Restart app...' + JSON.stringify(previousStatus),
               buttons: [{
                          text: 'OK',
                          handler: () => {
                            location.reload();
                          }
                        }]
             });
             nav.present(alert);
          }
          
        });
    });
    
    
  }
}