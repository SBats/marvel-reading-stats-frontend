import { Component, OnInit, HostBinding } from '@angular/core';

import { MRSService } from '../shared';

@Component({
  selector: 'mrs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') class = 'fullpage';
  userHasCollection: boolean = false;

  constructor(private mrsService: MRSService) {
  }

  ngOnInit() {
    this.userHasCollection = this.mrsService.userHasCollection;
  }

}
