import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MarvelService,
  MRSService,
  ComicDataWrapper,
  UserData
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

  constructor(
    private _marvelService: MarvelService,
    private _mrsService: MRSService
  ) {}

  ngOnInit(): void {
    this._marvelService.getComics()
      .subscribe((res: ComicDataWrapper) =>
        this.elements = res.data.results
      );

    this._mrsService.userData
      .subscribe((data: UserData) =>
        this.elements.map(element =>
          element.isInCollection = data.comics.indexOf(element.id)
        )
      );
  }

  addComicToCollection(comic) {
    console.log(comic);
  }

  removeComicFromCollection(comic) {
    console.log(comic);
  }
}
