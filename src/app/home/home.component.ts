import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-home',
  directives: [...ROUTER_DIRECTIVES],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {
  userHasCollection: boolean = false;

  constructor(private _mrsService: MRSService) {
  }

  ngOnInit() {
    this._mrsService.userData
      .subscribe(data => {
        this.userHasCollection = data.comics && data.comics.size > 0
      });
  }

}
