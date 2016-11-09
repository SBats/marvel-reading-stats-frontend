import {
  Component,
  OnInit,
  trigger,
  transition,
  style,
  state,
  animate
} from '@angular/core';

@Component({
  selector: 'mrs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: {
    '[@routeAnimation]': 'true',
    '[style.display]': "'block'",
    '[style.position]': "'absolute'"
  },
  animations: [
    trigger('routeAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms ease-out')
      ]),
      transition('* => void', animate('400ms ease-out', 
        style({
          opacity: 0
        })
      ))
    ])
  ]
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
