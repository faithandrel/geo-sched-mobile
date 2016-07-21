import {Component, OnInit} from "@angular/core";
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {Geolocation} from 'ionic-native';

import {SchdErrorHandler} from '../../services/schd-error-handler';

@Component({
  templateUrl: 'build/pages/display-map/display-map.html'
})
export class DisplayMapPage implements OnInit {
  
  myLat: any;
  myLong: any;
  myError: any;
  myPosition: any;
  platform: any;
  
  constructor() {
  }
  
  getMap() {

    Geolocation.getCurrentPosition().then((resp) => {
      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      
      let myLatLng = new GoogleMapsLatLng(this.myLat,this.myLong);
      
      let map = new GoogleMap('sch-google-map');
      map.setZoom(15);
      map.setCenter(myLatLng);
      
    },
    (error) => {
      //SchdErrorHandler.showSchdError(error);
    });

  }
  
  ngOnInit() {
    
  }

}
