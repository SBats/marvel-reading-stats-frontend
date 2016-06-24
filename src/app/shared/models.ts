import { MarvelComic } from './interfaces';

export class Comic implements MarvelComic {
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
