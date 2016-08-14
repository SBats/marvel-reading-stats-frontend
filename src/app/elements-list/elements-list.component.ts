import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'mrs-elements-list',
  template: require('./elements-list.component.html'),
  styles: [require('./elements-list.component.scss')]
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
