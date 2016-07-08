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
  template: require('./paginator.component.html'),
  styles: [require('./paginator.component.scss')]
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() pageQuantity: number = 0;
  @Input() currentPage: number = 0;
  @Output() selectPage: EventEmitter<any>;
  pageList: number[];

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

  setPageList(pageQuantity): void {
    if (pageQuantity && pageQuantity > 1) {
      this.pageList = new Array(pageQuantity);
    } else {
      this.pageList = null;
    }
  }

  select(ev, page): void {
    ev.preventDefault();
    this.selectPage.emit(page);
  }
}
