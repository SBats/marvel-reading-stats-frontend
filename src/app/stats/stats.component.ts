import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'fullpage';
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
