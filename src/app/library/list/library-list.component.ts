import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LibraryListComponent implements OnInit, OnDestroy {
  elements: any[] = [];
  loading: boolean = true;
  page: number = null;
  pageList: number[] = null;
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
          this.page = params['page'] || null;

          if (this.libraryType) {
            this.loadList();
          }
        })
    );

  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  setPageList(limit: number, total: number): void {
    let pagesCount = Math.ceil(total / limit);
    let newList = new Array(pagesCount);
    this.pageList = newList;
  }

  selectLetter(ev, filter) {
    ev.preventDefault();
    this.startWithQuery = filter;
    this.updateQueries();
  }

  selectPage(ev, page) {
    ev.preventDefault();
    this.page = page;
    this.updateQueries();
  }

  updateQueries() {
    let params: any = {};
    if (this.startWithQuery) {
      params.startwith = this.startWithQuery;
    }
    if (this.page) {
      params.page = this.page;
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
      this.page
    ).subscribe((res) => {
      this.elements = res.data.results;
      this.setPageList(res.data.limit, res.data.total);
      this.loading = false;
    });
  }
}
