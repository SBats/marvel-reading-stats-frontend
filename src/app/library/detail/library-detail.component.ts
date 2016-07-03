import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class LibraryDetailComponent implements OnInit, OnDestroy {
  elements: any[] = [];
  userData: UserData;
  libraryId: number;
  libraryType: string;
  private subscribers: any[] = [];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute,
    private mrsService: MRSService
  ) {}

  ngOnInit(): void {
    this.subscribers.push(
      this.route
        .params
        .subscribe(params => {
          this.libraryId = params['id'];
          this.libraryType = params['type'];

          this.subscribers.push(
            this.marvelService.getComicsFromType(this.libraryType, this.libraryId)
            .subscribe((res: ComicDataWrapper) => {
              this.elements = res.data.results;
              this.checkCollectionElements(this.elements, this.userData);
            })
          );
        })
    );


    this.subscribers.push(
      this.mrsService.userData
        .subscribe((data: UserData) => {
          this.userData = data;
          this.checkCollectionElements(this.elements, this.userData);
        })
      );
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
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
