import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'mrs-app',
  providers: [],
  directives: [...ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {
  title: string = 'Marvel reading stats';
}
