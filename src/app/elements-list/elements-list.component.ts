import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'mrs-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss']
})
export class ElementsListComponent {
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
