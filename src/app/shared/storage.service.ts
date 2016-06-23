import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StorageService {
  storageKey: string = 'marvel-readin-stats';
  currentStorage: Subject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  initStorage(): any {
    this.updateStorage({});
  }

  getStorage(): any {
    let storage = JSON.parse(localStorage.getItem(this.storageKey));
    if (!storage) {
      this.initStorage();
    } else {
      this.currentStorage.next(storage);
    }

  }

  updateStorage(newStorage: any): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(newStorage)
    );
    this.currentStorage.next(newStorage);
  }

  deleteStorage(): void {
    localStorage.removeItem(this.storageKey);
    this.currentStorage.next(null);
  }


}
