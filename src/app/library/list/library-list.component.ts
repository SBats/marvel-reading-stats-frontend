import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
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
  queryFiltersList: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' , 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  startWithQuery: string = this.queryFiltersList[0];
  private subscribers: any[] = [];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute,
    private router: Router
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
      this.router
        .routerState
        .queryParams
        .subscribe(params => {
          this.startWithQuery = params['startwith'] || this.queryFiltersList[0];
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

  selectQueryFilter(ev, filter) {
    ev.preventDefault();
    this.router.navigate(['.'], {queryParams: { startwith: filter}});
  }
}
