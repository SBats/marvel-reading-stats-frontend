import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { UserData } from '../interfaces';

@Injectable()
export class MRSService {
  userData: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);
  userHasCollection: boolean = false;

  constructor(private storageService: StorageService) {
    this.storageService.currentStorage
      .subscribe((storage) => {
        this.userData.next(storage);
        this.userHasCollection = storage.comics.size > 0;
      });
  }

  addComic(comic) {
    let newValue = this.userData.getValue();
    newValue.comics.set(comic.id, comic);
    this.storageService.updateStorage(newValue);
  }

  removeComic(comic) {
    let newValue = this.userData.getValue();
    newValue.comics.delete(comic.id);
    this.storageService.updateStorage(newValue);
  }


}
