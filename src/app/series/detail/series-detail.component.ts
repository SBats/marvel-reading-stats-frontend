import { Component, OnInit } from '@angular/core';
import {
  MarvelService,
  MRSService,
  ComicDataWrapper,
  UserData,
} from '../../shared';

import { ComicsListComponent } from '../../comics/list';

@Component({
  selector: 'mrs-series-detail',
  template: require('./series-detail.component.html'),
  styles: [require('./series-detail.component.scss')],
  directives: [
    ComicsListComponent
  ]
})
export class SeriesDetailComponent implements OnInit {
  elements: any[] = [];
  userData: UserData;

  constructor(
    private marvelService: MarvelService,
    private mrsService: MRSService
  ) {}

  ngOnInit(): void {
    this.marvelService.getComics()
      .subscribe((res: ComicDataWrapper) => {
        this.elements = res.data.results;
        this.checkCollectionElements(this.elements, this.userData);
      });

    this.mrsService.userData
      .subscribe((data: UserData) => {
        this.userData = data;
        this.checkCollectionElements(this.elements, this.userData);
      });
  }

  checkCollectionElements(elements, collection) {
    this.elements.map(element =>
      element.isInCollection = collection.comics.has(element.id)
    );
  }

  addComicToCollection(comic) {
    this.mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this.mrsService.removeComic(comic);
  }

}
