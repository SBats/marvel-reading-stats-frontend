import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

@Component({
  selector: 'mrs-elements-list',
  template: require('./elements-list.component.html'),
  styles: [require('./elements-list.component.scss')],
  directives: [ROUTER_DIRECTIVES]
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
