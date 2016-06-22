import { Component } from '@angular/core';

@Component({
  selector: 'mrs-comics-list',
  template: require('./comics-list.component.html'),
  styles: [require('./comics-list.component.scss')]
})
export class ComicsList {
  data: any = require('./data.mock.json');
  comics: any[] = this.data.results;
}
