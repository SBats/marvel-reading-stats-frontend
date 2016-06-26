import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../shared';

import { ElementsListComponent } from '../../elements-list';

@Component({
  selector: 'mrs-library-list',
  template: require('./library-list.component.html'),
  styles: [require('./library-list.component.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    ElementsListComponent
  ]
})
export class LibraryListComponent implements OnInit {
  elements: any[] = [];
  libraryType: string;
  private subscribers: any[] = [];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribers.push(
      this.route
        .params
        .subscribe(params => {
          this.libraryType = params['type'];
        })
    );

    this.subscribers.push(
      this.marvelService.getSeries()
        .subscribe((res) => {
          this.elements = res.data.results;
        })
      );
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }
}
