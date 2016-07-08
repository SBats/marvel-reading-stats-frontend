import {
  it,
  inject,
  describe,
  beforeEach,
  addProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { HomeComponent } from './home.component';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([
      HomeComponent
    ])
  });

});
