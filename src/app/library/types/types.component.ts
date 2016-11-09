import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mrs-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  types: any[] = [
    {img: '/assets/stan-lee.png', title: 'Authors'},
    {img: '/assets/series-thanos.jpg', title: 'Series'},
    {img: '/assets/events-civil_war.jpg', title: 'Events'},
    {img: '/assets/image1-36d32.gif', title: 'Heroes'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
