import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared';

@Component({
  selector: 'mrs-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit, OnDestroy {
  elements: any[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  pageQuantity: number = null;
  libraryType: string;
  queryFiltersList: string[] = [
    '#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  startWithQuery: string = null;
  private subscribers: any[] = [false];

  constructor(
    private apiService: ApiService,
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
      this.route
        .queryParams
        .subscribe(params => {
          this.startWithQuery = params['startwith'] || this.queryFiltersList[0];
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
    this.currentPage = null;
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
    this.router.navigate(['library', this.libraryType], {queryParams: params});
  }

  loadList() {
    this.loading = true;

    if (this.subscribers[0] && this.subscribers[0].unsubscribe) {
      this.subscribers[0].unsubscribe();
    }

    this.subscribers[0] = this.apiService.getTypeList(
      this.libraryType,
      this.startWithQuery
    ).subscribe((res: any[]) => {
      this.elements = res;
      this.setPageQuantity(0, 0);
      this.loading = false;
    });
  }

  navigateToDetail(element) {
    this.router.navigate(
      ['/library', this.libraryType , element.marvelId],
      {queryParams: {}}
    );
  }
}
