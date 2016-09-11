import { Component, OnInit, OnDestroy } from '@angular/core';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
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
