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
  @Output() selectAction: EventEmitter<any>;

  constructor() {
    this.selectAction = new EventEmitter();
  }

  select(ev, element) {
    ev.preventDefault();
    this.selectAction.emit(element);
  }

}
