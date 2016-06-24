import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-collection',
  template: require('./collection.component.html'),
  styles: [require('./collection.component.scss')],
  directives: [...ROUTER_DIRECTIVES]
})
export class CollectionComponent {
  userHasCollection: boolean = false;

  constructor(private _mrsService: MRSService) {
  }

  ngOnInit() {
    this.userHasCollection = this._mrsService.userHasCollection;
  }
}
