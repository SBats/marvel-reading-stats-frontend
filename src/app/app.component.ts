import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { StorageService } from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'mrs-app',
  directives: [...ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent implements OnInit {
  title: string = 'Marvel reading stats';
  showNav: boolean = false;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.getStorage();
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }
}
