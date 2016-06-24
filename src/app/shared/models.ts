import { Comic as ComicInterface } from './interfaces';

export class Comic implements ComicInterface {
  id: number;
  isInCollection: boolean = false;

  constructor() {
  }


}

export class ComicsCollection {
  collection: Comic[];

  constructor() {
  }


}
