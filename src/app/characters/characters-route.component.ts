import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared';

import { SeriesListComponent } from '../series/list';

@Component({
  selector: 'mrs-characters-route',
  template: require('./characters-route.component.html'),
  styles: [require('./characters-route.component.scss')],
  directives: [
    SeriesListComponent
  ]
})
export class CharactersRouteComponent implements OnInit {
  elements: any[] = [];

  constructor(
    private _marvelService: MarvelService
  ) {}

  ngOnInit(): void {
    this._marvelService.getSeries()
      .subscribe((res) => {
        this.elements = res.data.results;
      });
  }
}
