import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mrs-series-list',
  template: require('./series-list.component.html'),
  styles: [require('./series-list.component.scss')]
})
export class SeriesListComponent {
  @Input() list: any[];
  @Output() serieClick: EventEmitter<any>;

  constructor() {
    this.serieClick = new EventEmitter();
  }

  serieAction(serie) {
    this.serieClick.emit(serie);
  }

}
