import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { MarvelService } from '../../core';
import '../../rxjs-operators';

@Component({
  selector: 'mrs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  results: any[] = [];
  loading: boolean = true;
  libraryType: string;
  startWithQuery: string = null;
  currentPage: number = 1;
  pageTotal: number = 1;
  breadcrumbLinks: any[] = [
    {
      path: '/library',
      label: 'Library',
      current: false
    }
  ];
  private subscribers: any[] = [false];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribers.push(
      this.route
        .params
        .subscribe(params => {
          this.libraryType = params['type'];
          this.breadcrumbLinks.push({
            path: null,
            label: params['type'],
            current: true
          });
          this.loadList();
        })
    );

    this.subscribers.push(
      this.route
        .queryParams
        .subscribe(params => {
          this.startWithQuery = params['startwith'] || null;
          this.currentPage = parseInt(params['page']) || 1;
          if (this.libraryType) {
            this.loadList();
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  selectQueryFilter(filter) {
    this.startWithQuery = filter;
    this.currentPage = 1;
    this.updateQueries();
  }

  selectPage(page) {
    if (page > 0 && page <= this.pageTotal) {
      this.currentPage = page;
      this.updateQueries();
    }
  }

  goToDetail(element) {
    console.log(element);
    this.router.navigate(
      ['library', this.libraryType, element.marvel_id]
    );
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

    this.subscribers[0] = this.marvelService.getTypeList(
      this.libraryType,
      this.startWithQuery,
      this.currentPage
    ).subscribe((res: any[]) => {
      this.results = res['results'];
      this.pageTotal = Math.ceil(res['count'] / 20);
      this.loading = false;
    });
  }

}
