import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { UserData } from './interfaces';

@Injectable()
export class StorageService {
  storageKey: string = 'marvel-reading-stats';
  currentStorage: Subject<any> = new BehaviorSubject<any>(null);
  defaultModel: UserData = {
    comics: new Map()
  };

  constructor() {
  }

  initStorage(): any {
    this.updateStorage(this.defaultModel);
  }

  getStorage(): any {
    let storage = JSON.parse(localStorage.getItem(this.storageKey));
    if (!storage) {
      this.initStorage();
    } else {
      // Convert localStorage Array to Map
      storage.comics = new Map(storage.comics);
      this.currentStorage.next(storage);
    }

  }

  updateStorage(newStorage: any): void {
    const storageItem = Object.assign({}, newStorage);
    // Convert Map to Array for localStorage
    storageItem.comics = Array.from(storageItem.comics);
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(storageItem)
    );
    this.currentStorage.next(newStorage);
  }

  deleteStorage(): void {
    localStorage.removeItem(this.storageKey);
    this.currentStorage.next(null);
  }


}
