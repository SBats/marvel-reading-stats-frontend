import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { UserData } from './interfaces';

@Injectable()
export class MRSService {
  defaultModel: UserData = {
    comics: []
  };
  userData: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private _storageService: StorageService) {
    this._storageService.currentStorage
      .subscribe(this.userData);
  }

  addComic(comicId) {
  }

  removeComic(comicId) {
  }


}
