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
  private subscribers: any[] = [];

  constructor(private mrsService: MRSService) {
  }

  ngOnInit() {
    this.subscribers.push(
      this.mrsService.userData.subscribe((data: any) => {
        this.collection = Array.from(data.comics.values());
        this.collection.map(element => element.isInCollection = true);
      })
    );
    this.userHasCollection = this.mrsService.userHasCollection;
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  addComicToCollection(comic) {
    this.mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this.mrsService.removeComic(comic);
  }
}
