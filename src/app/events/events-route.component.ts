import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared';

import { SeriesListComponent } from '../series/list';

@Component({
  selector: 'mrs-events-route',
  template: require('./events-route.component.html'),
  styles: [require('./events-route.component.scss')],
  directives: [
    SeriesListComponent
  ]
})
export class EventsRouteComponent implements OnInit {
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
