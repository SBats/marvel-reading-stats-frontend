import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mrs-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent {

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
