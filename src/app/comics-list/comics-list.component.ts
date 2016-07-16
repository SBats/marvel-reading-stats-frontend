import {
  Component,
  Input,
  Output,
  EventEmitter,
  animate,
  trigger,
  transition,
  style
} from '@angular/core';

@Component({
  selector: 'mrs-comics-list',
  template: require('./comics-list.component.html'),
  styles: [require('./comics-list.component.scss')]
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
