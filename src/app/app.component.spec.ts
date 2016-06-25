import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

import { StorageService } from './shared';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent,
    StorageService
  ]);

  it('should have a title', inject([AppComponent, StorageService], (app: AppComponent, StorageService) => {
    expect(!!app.title).toEqual(true);
  }));

});
