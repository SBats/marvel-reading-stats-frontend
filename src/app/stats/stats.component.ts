import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { MRSService, MarvelComic } from '../shared';

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
