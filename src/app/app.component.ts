import {
  Component,
  animate,
  trigger,
  transition,
  style
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  title: string = 'Marvel reading stats';
  showNav: boolean = false;

  toggleNav() {
    this.showNav = !this.showNav;
  }
}
