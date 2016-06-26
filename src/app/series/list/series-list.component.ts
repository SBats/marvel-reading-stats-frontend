import {
  Component,
  Input
} from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

@Component({
  selector: 'mrs-series-list',
  template: require('./series-list.component.html'),
  styles: [require('./series-list.component.scss')],
  directives: [ROUTER_DIRECTIVES]
})
export class SeriesListComponent {
  @Input() list: any[];
}
