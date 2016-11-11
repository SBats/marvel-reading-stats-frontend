import {
  Component,
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
  animations: [
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
export class TypesComponent {
  types: any[] = [
    {img: '/assets/stan-lee.png', title: 'Authors', url: 'authors'},
    {img: '/assets/series-thanos.jpg', title: 'Series', url: 'series'},
    {img: '/assets/events-civil_war.jpg', title: 'Events', url: 'events'},
    {img: '/assets/image1-36d32.gif', title: 'Heroes', url: 'heroes'}
  ];
}
