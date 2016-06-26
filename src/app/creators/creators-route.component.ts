import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared';

import { SeriesListComponent } from '../series/list';

@Component({
  selector: 'mrs-creators-route',
  template: require('./creators-route.component.html'),
  styles: [require('./creators-route.component.scss')],
  directives: [
    SeriesListComponent
  ]
})
export class CreatorsRouteComponent implements OnInit {
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

  navigateToSerie(serie) {
    console.log(serie);
  }
}
