import {
  inject,
  addProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

import { StorageService } from './shared';

describe('App Component', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([
      AppComponent,
      StorageService
    ]);
  });

  it('should have a title', inject([AppComponent, StorageService], (app: AppComponent, StorageService) => {
    expect(!!app.title).toEqual(true);
  }));

  it('should have a showNav property to false', inject([AppComponent, StorageService], (app: AppComponent, StorageService) => {
    expect(app.showNav).toEqual(false);
  }));

  describe('toggleNav', () => {
    it('should reverse showNav value', inject([AppComponent, StorageService], (app: AppComponent, StorageService) => {
      expect(app.showNav).toEqual(false);
      app.toggleNav();
      expect(app.showNav).toEqual(true);
    }));
  });


});
