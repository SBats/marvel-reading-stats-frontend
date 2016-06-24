import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MarvelService,
  MRSService,
  ComicDataWrapper,
  UserData,
  Comic
} from '../shared';

import { ComicsListComponent } from '../comics/list';
@Component({
  selector: 'mrs-library',
  template: require('./library.component.html'),
  styles: [require('./library.component.scss')],
  directives: [ComicsListComponent]
})
export class LibraryComponent implements OnInit {
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
    this.elements.map(element => {
      element.isInCollection = collection.comics.has(element.id)
    })
  }

  addComicToCollection(comic) {
    this._mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this._mrsService.removeComic(comic);
  }
}
