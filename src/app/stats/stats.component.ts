import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService } from '../shared';
import { TimeSpentPipe } from './stats.pipes';

@Component({
  selector: 'mrs-stats',
  template: require('./stats.component.html'),
  styles: [require('./stats.component.scss')],
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  pipes: [
    TimeSpentPipe
  ]
})
export class StatsComponent implements OnInit, OnDestroy {
  userHasCollection: boolean = false;
  collection: any[] = [];
  private subscribers: any[] = [];

  constructor(private mrsService: MRSService) {
  }

  ngOnInit() {
    this.subscribers.push(
      this.mrsService.userData.subscribe((data: any) => {
        this.collection = Array.from(data.comics.values());
        this.collection.map(element => element.isInCollection = true);
      })
    );
    this.userHasCollection = this.mrsService.userHasCollection;
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }
}
