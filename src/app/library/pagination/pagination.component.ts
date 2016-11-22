import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mrs-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() current: number;
  @Input() total: number;
  @Output() select = new EventEmitter<any>();

  selectPage(ev, pageNumber) {
    ev.preventDefault();
    this.select.emit(pageNumber);
  }

}
