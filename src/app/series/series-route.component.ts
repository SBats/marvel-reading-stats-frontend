import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared';

import { SeriesListComponent } from '../series/list';

@Component({
  selector: 'mrs-series-route',
  template: require('./series-route.component.html'),
  styles: [require('./series-route.component.scss')],
  directives: [
    SeriesListComponent
  ]
})
export class SeriesRouteComponent implements OnInit {
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
