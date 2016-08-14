import {
  Component,
  OnInit,
  animate,
  trigger,
  transition,
  style
} from '@angular/core';

import { StorageService } from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'mrs-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  animations: [
    trigger('headerState', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 400ms ease-out')
      ])
    ]),
    trigger('footerState', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 500ms ease-out')
      ])
    ]),
    trigger('contentState', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 600ms ease-out')
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title: string = 'Marvel reading stats';
  showNav: boolean = false;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.getStorage();
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }
}
