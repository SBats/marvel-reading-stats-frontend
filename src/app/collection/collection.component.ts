import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService } from '../shared';
import { ComicsListComponent } from '../comics/list';

@Component({
  selector: 'mrs-collection',
  template: require('./collection.component.html'),
  styles: [require('./collection.component.scss')],
  directives: [
    ...ROUTER_DIRECTIVES,
    ComicsListComponent
  ]
})
export class CollectionComponent implements OnInit {
  userHasCollection: boolean = false;
  collection: any[] = [];

  constructor(private _mrsService: MRSService) {
  }

  ngOnInit() {
    this._mrsService.userData.subscribe((data: any) => {
      this.collection = Array.from(data.comics.values());
      this.collection.map(element => element.isInCollection = true);
    });
    this.userHasCollection = this._mrsService.userHasCollection;
  }

  addComicToCollection(comic) {
    this._mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this._mrsService.removeComic(comic);
  }
}
