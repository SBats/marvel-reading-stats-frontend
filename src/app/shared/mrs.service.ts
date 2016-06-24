import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { Comic } from './models';

@Injectable()
export class MRSService {
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _storageService: StorageService) {
    this._storageService.currentStorage
      .subscribe(this.userData);
  }

  addComic(comicId) {
    let newValue = this.userData.getValue();
    newValue.comics.add(comicId);
    this._storageService.updateStorage(newValue);
  }

  removeComic(comicId) {
    let newValue = this.userData.getValue();
    newValue.comics.delete(comicId);
    this._storageService.updateStorage(newValue);
  }


}
