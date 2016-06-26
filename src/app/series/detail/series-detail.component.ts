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
    private _marvelService: MarvelService,
    private _mrsService: MRSService
  ) {}

  ngOnInit(): void {
    this._marvelService.getComics()
      .subscribe((res: ComicDataWrapper) => {
        this.elements = res.data.results;
        this.checkCollectionElements(this.elements, this.userData);
      });

    this._mrsService.userData
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
    this._mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this._mrsService.removeComic(comic);
  }

}
