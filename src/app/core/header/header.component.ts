import {
  Component,
  Input,
  animate,
  trigger,
  transition,
  style
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'mrs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerState', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 400ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  @Input() title: string;
  showNav: boolean = false;

  toggleNav() {
    this.showNav = !this.showNav;
  }

  constructor() { }

}
