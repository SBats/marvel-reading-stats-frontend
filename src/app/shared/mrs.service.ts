import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { Comic } from './models';
import { UserData } from './interfaces';

@Injectable()
export class MRSService {
  userData: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);

  constructor(private _storageService: StorageService) {
    this._storageService.currentStorage
      .subscribe(this.userData);
  }

  addComic(comic) {
    let newValue = this.userData.getValue();
    newValue.comics.set(comic.id, comic);
    this._storageService.updateStorage(newValue);
  }

  removeComic(comic) {
    let newValue = this.userData.getValue();
    newValue.comics.delete(comic.id);
    this._storageService.updateStorage(newValue);
  }


}
