import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { userDataModel } from './models';

@Injectable()
export class MRSService {
  defaultModel: userDataModel = {
    comics: []
  };
  userData: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private _storageService: StorageService) {
    this._storageService.currentStorage
      .subscribe(this.userData);
    this._storageService.getStorage();
  }

  AddComic() {

  }

  RemoveComic() {

  }


}
