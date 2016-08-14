'use strict';

import {
  inject,
  addProviders,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { MRSService } from './mrs.service';
import { StorageService } from './storage.service';

describe('MRS Service', () => {

  beforeEach(() => {
    addProviders([
      StorageService,
      MRSService
    ]);
  });

  beforeEach(inject([StorageService], (storageService: StorageService) => {
    storageService.initStorage();
  }));

  describe('userHasCollection', () => {
    it('should be false at first',
    inject([MRSService], (mrsService: MRSService) => {
      expect(mrsService.userHasCollection).toBe(false);
    }));

    it('should be true if user has 1 or more comics',
    inject([MRSService], fakeAsync((mrsService: MRSService) => {
      mrsService.addComic({id: 'test'});
      tick();
      expect(mrsService.userHasCollection).toBe(true);
    })));

    it('should be false if user delete all his comics',
    inject([MRSService], fakeAsync((mrsService: MRSService) => {
      mrsService.addComic({id: 'test'});
      expect(mrsService.userHasCollection).toBe(true);
      mrsService.removeComic({id: 'test'});
      expect(mrsService.userHasCollection).toBe(false);
      tick();
    })));
  });

  describe('addComic', () => {
    it('should add a comic to storage',
    inject([MRSService, StorageService],  fakeAsync((mrsService: MRSService, storageService: StorageService) => {
      let counter;
      storageService.initStorage();
      mrsService.userData.subscribe(data => counter = data.comics.size);
      expect(counter).toBe(0);
      mrsService.addComic({id: 'test'});
      expect(counter).toBe(1);
      tick();
    })));
  });

  describe('removeComic', () => {
    it('should remove a comic from storage',
    inject([MRSService, StorageService],  fakeAsync((mrsService: MRSService, storageService: StorageService) => {
      let counter;
      storageService.initStorage();
      mrsService.userData.subscribe(data => counter = data.comics.size);
      mrsService.addComic({id: 'test'});
      expect(counter).toBe(1);
      mrsService.removeComic({id: 'test'});
      expect(counter).toBe(0);
      tick();
    })));
  });

});
