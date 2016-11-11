import {
  Component,
  Input,
  animate,
  trigger,
  transition,
  state,
  style
} from '@angular/core';

@Component({
  selector: 'mrs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '[@headerState]': 'true'
  },
  animations: [
    trigger('headerState', [
      state('*', style({
        opacity: 1
      })),
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
}
