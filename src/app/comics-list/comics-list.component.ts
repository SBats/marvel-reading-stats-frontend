import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mrs-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent {
  @Input() list: any[];
  @Output() addAction: EventEmitter<any>;
  @Output() removeAction: EventEmitter<any>;

  constructor() {
    this.addAction = new EventEmitter();
    this.removeAction = new EventEmitter();
  }

  add(comic) {
    this.addAction.emit(comic);
  }

  remove(comic) {
    this.removeAction.emit(comic);
  }

}
