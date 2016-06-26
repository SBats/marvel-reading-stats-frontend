import { Component, OnInit } from '@angular/core';
import {
  MarvelService,
  MRSService,
  ComicDataWrapper,
  UserData,
} from '../../shared';

import { ComicsListComponent } from '../../comics/list';

@Component({
  selector: 'mrs-library-detail',
  template: require('./library-detail.component.html'),
  styles: [require('./library-detail.component.scss')],
  directives: [
    ComicsListComponent
  ]
})
export class LibraryDetailComponent implements OnInit {
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
