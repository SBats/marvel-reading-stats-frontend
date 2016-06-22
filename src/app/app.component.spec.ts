import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent
  ]);

  it('should have an url', inject([AppComponent], (app: AppComponent) => {
    expect(!!app.title).toEqual(true);
  }));

});
