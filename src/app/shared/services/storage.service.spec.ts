'use strict';

import {
  inject,
  addProviders,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { StorageService } from './storage.service';

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    let mock = (function() {
        let store = {};
        return {
            getItem: function(key) {
                return store[key];
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            clear: function() {
                store = {};
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', { value: mock, configurable: true, enumerable: true, writable: true });
}

describe('Storage Service', () => {

  beforeEach(() => {
    addProviders([
      StorageService
    ]);
    localStorage.clear();
  });

  describe('storageKey', () => {
    it('should be a string',
    inject([StorageService], (storageService: StorageService) => {
      expect(typeof storageService.storageKey).toBe('string');
    }));
  });

  describe('currentStorage', () => {
    it('should send last value on subscribe',
    inject([StorageService], fakeAsync((storageService: StorageService) => {
      let userData;
      storageService.initStorage();
      storageService.currentStorage.subscribe(data => userData = data);
      tick();
      expect(!!userData.comics).toEqual(true);
    })));
  });

  describe('initStorage', () => {
    it('should call updateStorage',
    inject([StorageService], (storageService: StorageService) => {
      spyOn(storageService, 'updateStorage');
      storageService.initStorage();
      expect(storageService.updateStorage).toHaveBeenCalled();
    }));

    it('with default model Map converted to an Object',
    inject([StorageService], (storageService: StorageService) => {
      let storage;
      let storageModel = Object.assign({}, storageService.defaultModel);
      storageModel.comics = Array.from(storageModel.comics);

      storageService.initStorage();
      storage = localStorage.getItem(storageService.storageKey);

      expect(JSON.parse(storage)).toEqual(storageModel);
    }));
  });

  describe('getStorage', () => {
    it('should getItem on storage',
    inject([StorageService], (storageService: StorageService) => {
      spyOn(localStorage, 'getItem');
      storageService.getStorage();
      expect(localStorage.getItem).toHaveBeenCalled();
    }));

    it('should call initStorage if storage is not defined',
    inject([StorageService], (storageService: StorageService) => {
      spyOn(storageService, 'initStorage');
      storageService.getStorage();
      expect(storageService.initStorage).toHaveBeenCalled();
    }));

    it('should update currentStorage',
    inject([StorageService], fakeAsync((storageService: StorageService) => {
      let userData;
      storageService.currentStorage.subscribe(data => userData = data);
      localStorage.setItem(storageService.storageKey, '{"comics": [["test", {}]]}');
      storageService.getStorage();
      tick();
      expect(userData.comics.has('test')).toBe(true);
    })));

  });

  describe('updateStorage', () => {
    it('should setItem on storage',
    inject([StorageService], (storageService: StorageService) => {
      spyOn(localStorage, 'setItem');
      storageService.updateStorage(storageService.defaultModel);
      expect(localStorage.setItem).toHaveBeenCalled();
    }));

    it('should convert comics Map to Array',
    inject([StorageService], (storageService: StorageService) => {
      let storage;
      storageService.updateStorage(storageService.defaultModel);
      storage = JSON.parse(localStorage.getItem(storageService.storageKey));
      expect(storage.comics instanceof Array).toBe(true);
    }));

    it('should update currentStorage',
    inject([StorageService], fakeAsync((storageService: StorageService) => {
      let userData;
      let newStorage = storageService.defaultModel;
      newStorage.comics.set('test', {});
      storageService.currentStorage.subscribe(data => userData = data);
      storageService.updateStorage(newStorage);
      tick();
      expect(userData.comics.has('test')).toBe(true);
    })));

  });

  describe('deleteStorage', () => {
    it('should removeItem on storage',
    inject([StorageService], (storageService: StorageService) => {
      spyOn(localStorage, 'removeItem');
      storageService.deleteStorage();
      expect(localStorage.removeItem).toHaveBeenCalled();
    }));

    it('should update currentStorage to null',
    inject([StorageService], fakeAsync((storageService: StorageService) => {
      let userData;
      storageService.initStorage();
      storageService.currentStorage.subscribe(data => userData = data);
      storageService.deleteStorage();
      tick();
      expect(userData).toBe(null);
    })));

  });
});
