import {
  Component,
  animate,
  trigger,
  transition,
  style
} from '@angular/core';

@Component({
  selector: 'mrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('footerState', [
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
