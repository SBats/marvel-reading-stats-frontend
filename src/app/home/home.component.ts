import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  directives: [...ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
  userHasCollection: boolean = false;

  constructor(private mrsService: MRSService) {
  }

  ngOnInit() {
    this.userHasCollection = this.mrsService.userHasCollection;
  }

}
