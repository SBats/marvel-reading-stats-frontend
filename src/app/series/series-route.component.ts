import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  seriesType: string;
  params: any;

  constructor(
    private _marvelService: MarvelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params = this.route
      .params
      .subscribe(params => {
        this.seriesType = params['type'];
      });

    this._marvelService.getSeries()
      .subscribe((res) => {
        this.elements = res.data.results;
      });
  }
}
