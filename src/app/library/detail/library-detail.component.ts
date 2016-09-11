import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MarvelService,
  MRSService,
  ComicDataWrapper,
  UserData,
} from '../../shared';

@Component({
  selector: 'mrs-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.scss']
})
export class LibraryDetailComponent implements OnInit, OnDestroy {
  elements: any[] = [];
  loading: boolean= true;
  userData: UserData;
  currentPage: number = 1;
  pageQuantity: number = null;
  libraryId: number;
  libraryType: string;
  private subscribers: any[] = [];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute,
    private router: Router,
    private mrsService: MRSService
  ) {}

  ngOnInit(): void {
    this.subscribers.push(
      this.route
        .params
        .subscribe(params => {
          this.libraryId = params['id'];
          this.libraryType = params['type'];

          if (this.libraryType && this.libraryId) {
            this.loadList();
          }
        })
    );

    this.subscribers.push(
      this.route
        .queryParams
        .subscribe(params => {
          this.currentPage = params['page'] || 1;

          if (this.libraryType && this.libraryId) {
            this.loadList();
          }
        })
    );

    this.subscribers.push(
      this.mrsService.userData
        .subscribe((data: UserData) => {
          this.userData = data;
          this.checkCollectionElements(this.elements, this.userData);
        })
      );
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  setPageQuantity(limit: number, total: number): void {
    this.pageQuantity = Math.ceil(total / limit);
  }

  selectPage(page) {
    this.currentPage = page;
    this.updateQueries();
  }

  updateQueries() {
    let params: any = {};
    if (this.currentPage) {
      params.page = this.currentPage;
    }
    this.router.navigate(['library', this.libraryType, this.libraryId], {queryParams: params});
  }

  loadList() {
    this.loading = true;

    if (this.subscribers[0] && this.subscribers[0].unsubscribe) {
      this.subscribers[0].unsubscribe();
    }

    this.subscribers[0] = this.marvelService.getComicsFromType(
      this.libraryType,
      this.libraryId,
      this.currentPage
    ).subscribe((res: ComicDataWrapper) => {
      this.elements = res.data.results;
      this.checkCollectionElements(this.elements, this.userData);
      this.setPageQuantity(res.data.limit, res.data.total);
      this.loading = false;
    });
  }

  checkCollectionElements(elements, collection) {
    this.elements.map(element =>
      element.isInCollection = collection.comics.has(element.id)
    );
  }

  addComicToCollection(comic) {
    this.mrsService.addComic(comic);
  }

  removeComicFromCollection(comic) {
    this.mrsService.removeComic(comic);
  }

}
