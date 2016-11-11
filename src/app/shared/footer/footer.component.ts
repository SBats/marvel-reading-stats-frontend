import {
  Component,
  animate,
  trigger,
  transition,
  state,
  style
} from '@angular/core';

@Component({
  selector: 'mrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: {
    '[@footerState]': 'true'
  },
  animations: [
    trigger('footerState', [
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 500ms ease-out')
      ])
    ]),
  ]
})
export class FooterComponent { }
