import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { MarvelService, ComicDataWrapper } from '../../shared';

import { ElementsListComponent } from '../../elements-list';
import { PaginatorComponent } from '../../paginator';

@Component({
  selector: 'mrs-library-list',
  template: require('./library-list.component.html'),
  styles: [require('./library-list.component.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    ElementsListComponent,
    PaginatorComponent
  ]
})
export class LibraryListComponent implements OnInit, OnDestroy {
  elements: any[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  pageQuantity: number = null;
  libraryType: string;
  queryFiltersList: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  startWithQuery: string = null;
  private subscribers: any[] = [false];

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
          this.loadList();
        })
    );

    this.subscribers.push(
      this.router
        .routerState
        .queryParams
        .subscribe(params => {
          this.startWithQuery = params['startwith'] || null;
          this.currentPage = params['page'] || 1;

          if (this.libraryType) {
            this.loadList();
          }
        })
    );

  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  setPageQuantity(limit: number, total: number): void {
    this.pageQuantity = Math.ceil(total / limit);
  }

  selectLetter(ev, filter) {
    ev.preventDefault();
    this.startWithQuery = filter;
    this.updateQueries();
  }

  selectPage(page) {
    this.currentPage = page;
    this.updateQueries();
  }

  updateQueries() {
    let params: any = {};
    if (this.startWithQuery) {
      params.startwith = this.startWithQuery;
    }
    if (this.currentPage) {
      params.page = this.currentPage;
    }
    this.router.navigate(['.'], {queryParams: params});
  }

  loadList() {
    this.loading = true;

    if (this.subscribers[0] && this.subscribers[0].unsubscribe) {
      this.subscribers[0].unsubscribe();
    }

    this.subscribers[0] = this.marvelService.getTypeList(
      this.libraryType,
      this.startWithQuery,
      this.currentPage
    ).subscribe((res: ComicDataWrapper) => {
      this.elements = res.data.results;
      this.setPageQuantity(res.data.limit, res.data.total);
      this.loading = false;
    });
  }
}
