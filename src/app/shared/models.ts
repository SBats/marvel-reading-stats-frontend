import { MarvelComic } from './interfaces';

export class Comic implements MarvelComic {
  isInCollection: boolean = false;
}

export class ComicsCollection {
  collection: Comic[];
}
