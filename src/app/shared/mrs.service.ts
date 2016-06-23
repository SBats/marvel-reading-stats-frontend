import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { StorageService, userDataModel } from './';

@Injectable()
export class MRSService {
  defaultModel: userDataModel = {
    comics: []
  };
  userData: Subject<any> = new Subject<any>(null);

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
