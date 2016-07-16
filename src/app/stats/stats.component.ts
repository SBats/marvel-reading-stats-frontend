import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MRSService, MarvelComic } from '../shared';
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
  favouriteCharacter: string = null;

  constructor(private mrsService: MRSService) {
  }

  ngOnInit() {
    this.subscribers.push(
      this.mrsService.userData.subscribe((data: any) => {
        this.collection = Array.from(data.comics.values());
        this.collection.map(element => element.isInCollection = true);
        this.favouriteCharacter = this.computeFavouriteCharacter(this.collection);
        console.log(this.favouriteCharacter);
      })
    );
    this.userHasCollection = this.mrsService.userHasCollection;
  }

  computeFavouriteCharacter(collection: MarvelComic[]): string {
    const charList = {};
    let favouriteChar = null;
    let favouriteCount = 0;

    collection.map(comic => {
      comic.characters.items.map(char => {
        if (!charList[char.name]) {
          charList[char.name] = 1;
        } else {
          charList[char.name]++;
        }
      });
    });
    for (let char in charList) {
      if (charList[char] > favouriteCount) {
        favouriteChar = char;
        favouriteCount = charList[char];
      }
    }

    return favouriteChar;
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }
}
