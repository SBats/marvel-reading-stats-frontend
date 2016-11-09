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
  selector: 'mrs-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
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
    ]),
    trigger('typeItemAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('400ms 400ms ease-out')
      ]),
      transition('* => void', animate('400ms 400ms ease-out', 
        style({
          opacity: 0
        })
      ))
    ])
  ],
})
export class TypesComponent implements OnInit {

  types: any[] = [
    {img: '/assets/stan-lee.png', title: 'Authors'},
    {img: '/assets/series-thanos.jpg', title: 'Series'},
    {img: '/assets/events-civil_war.jpg', title: 'Events'},
    {img: '/assets/image1-36d32.gif', title: 'Heroes'}
  ];
  timedTypes: any[] = [];

  constructor() { }

  ngOnInit() {
    this.types.map((type, index) => {
      setTimeout(() => this.timedTypes.push(type), 100 * index);
    });
  }

}
