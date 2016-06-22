import { Component, Input } from '@angular/core';

@Component({
  selector: 'mrs-comics-list',
  template: require('./comics-list.component.html'),
  styles: [require('./comics-list.component.scss')]
})
export class ComicsListComponent {
  @Input() list: any[];
}
