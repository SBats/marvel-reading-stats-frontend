import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface StorageModel {
  comics: number[]
}

@Injectable()
export class MRSService {
  storageKey: string = 'marvel-readin-stats';
  defaultModel: StorageModel = {
    comics: []
  };
  currentStorage: StorageModel = null;

  constructor() {
    this.initStorage();
  }

  initStorage() {
    let storage: StorageModel = this.getStorage();
    if (!storage) {
      this.updateStorage(this.defaultModel);
    }
  }

  getStorage(): StorageModel {
    let storage = JSON.parse(localStorage.getItem(this.storageKey));
    this.currentStorage = storage;
    return storage;
  }

  updateStorage(newStorage: StorageModel): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(newStorage)
    );
    this.currentStorage = newStorage;
  }

  deleteStorage() {
    let storage: StorageModel = this.getStorage();
    if (!storage) {
      localStorage.removeItem(this.storageKey);
      this.currentStorage = null;
    }
  }


}
