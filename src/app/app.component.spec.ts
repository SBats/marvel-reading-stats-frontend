import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

import { StorageService } from './shared';

describe('App Component', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        StorageService,
        provideRoutes([])
      ]
    });
  });

  it('should have a title', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(!!app.title).toEqual(true);
  });

  it('should have a showNav property to false', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.showNav).toEqual(false);
  });

  describe('toggleNav', () => {
    it('should reverse showNav value', () => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(app.showNav).toEqual(false);
      app.toggleNav();
      expect(app.showNav).toEqual(true);
    });
  });


});
