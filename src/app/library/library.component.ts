import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared';

import { ComicsListComponent } from '../comics/list';
@Component({
  selector: 'mrs-library',
  template: require('./library.component.html'),
  styles: [require('./library.component.scss')],
  directives: [ComicsListComponent]
})
export class LibraryComponent implements OnInit {
  elements: any[] = [];

  constructor(public marvelService: MarvelService) {}

  ngOnInit(): void {
    this.marvelService.getSeries()
      .subscribe((res: any) => {
        this.elements = res.results;
      });
  }
}
