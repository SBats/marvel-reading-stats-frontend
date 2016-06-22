import { Component } from '@angular/core';

import { ComicsList } from '../comics/list';

@Component({
  selector: 'mrs-library',
  template: require('./library.component.html'),
  styles: [require('./library.component.scss')],
  directives: [ComicsList]
})
export class LibraryComponent {
}
