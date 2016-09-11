import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'mrs-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() pageQuantity: number = 0;
  @Input() currentPage: number = 0;
  @Output() selectPage: EventEmitter<any>;
  pageList: number[];
  popupIsOpened: boolean = false;

  constructor() {
    this.selectPage = new EventEmitter();
  }

  ngOnInit(): void {
    this.setPageList(this.pageQuantity);
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    if (changes['pageQuantity']) {
      this.setPageList(changes['pageQuantity'].currentValue);
    }
  }

  setPageList(pageQuantity: number): void {
    if (pageQuantity && pageQuantity > 1) {
      this.pageList = new Array(pageQuantity);
    } else {
      this.pageList = null;
    }
  }

  select(ev: any, page: any): void {
    ev.preventDefault();
    this.selectPage.emit(page);
  }

  showPopup() {
    this.popupIsOpened = true;
  }

  hidePopup() {
    this.popupIsOpened = false;
  }

  togglePopup() {
    this.popupIsOpened = !this.popupIsOpened;
  }
}
