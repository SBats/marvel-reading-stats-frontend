import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

@Component({
  selector: 'mrs-library',
  template: require('./library.component.html'),
  styles: [require('./library.component.scss')],
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class LibraryComponent {
}
