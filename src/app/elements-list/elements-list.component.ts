import {
  Component,
  Input
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
}
