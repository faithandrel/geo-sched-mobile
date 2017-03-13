import {Component} from "@angular/core";
import {NavController, NavParams, Nav} from 'ionic-angular';

import {BackEndService} from '../../services/back-end-service';
import {SchdErrorHandler} from '../../services/schd-error-handler';

@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  myResults: any;
  
  constructor(private nav: NavController, navParams: NavParams,
              private myNav: Nav,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.nav.push(ListPage, {
      item: item
    });
  }
  
  itemsTest() {
     this.backEndService
        .getItems()
        .then(res => this.myResults = res)
        .catch(error => {
            this.schdErrorHandler.showSchdError(error, this.myNav);
        });
  }
}
