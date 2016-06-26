import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'mrs-library-types',
  template: require('./library-types.component.html'),
  styles: [require('./library-types.component.scss')],
  directives: [ROUTER_DIRECTIVES]
})
export class LibraryTypesComponent {
}
